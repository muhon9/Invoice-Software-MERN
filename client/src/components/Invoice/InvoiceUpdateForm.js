import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import axios from "axios";
// Material Ui core components
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

//Components
import FormItemTable from "./FormItemTable";
//Functions for fetching backend data
import { addInvoiceAction } from "../../actions/invoiceActions";
import { queryClients } from "../../functions/clientFunctions";
import FormNewCustomerDialog from "./FormNewCustomerDialog";
import { Alert } from "@material-ui/lab";
import { updateInvoice } from "../../functions/invoiceFunctions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  dialogForm: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(5),
    margin: "auto",
    //width: "fit-content",
  },
}));

export default function InvoiceUpdateForm({ oldInvoice }) {
  const history = useHistory();

  //Default Invoice date
  var date = new Date(); // this is today date
  const dateformated = dayjs(date).format("YYYY-MM-DD"); // formated version for setting default

  const classes = useStyles();
  const filter = createFilterOptions();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.loginUser);
  const { error } = useSelector((state) => state.addInvoice);

  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [invoice, setInvoice] = useState({});

  const {
    customerName,
    customerNumber,
    customerAddress,
    invoiceNumber,
    invoiceDate,
    dueDate,
    note,
    discount,
    paid,
    due,
  } = invoice;

  const [items, setItems] = useState([
    {
      itemName: "",
      itemDescription: "",
      itemQuantity: "",
      itemPrice: "",
      total: 0,
    },
  ]);
  const [customerFieldValue, setCustomerFieldValue] = useState("");
  //we will save the suggested clients received from the backend when user write the name
  const [clientOption, setClientOption] = useState([]);
  const [clientQ, setClientQ] = useState("");

  //state for dialog to add a new customer
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    customerName: "",
    customerNumber: "",
    customerAddress: "",
  });

  useEffect(() => {
    if (clientQ && clientQ.length > 0) {
      queryClients(clientQ, userInfo.token).then((res) => {
        setClientOption(res.data);
      });
    }
  }, [clientQ, userInfo]);

  useEffect(() => {
    setInvoice({ ...oldInvoice });
    if (oldInvoice) {
      setItems(oldInvoice.items);
      setSubTotal(oldInvoice.subTotal);
    }
  }, [oldInvoice]);

  // useEffect(()=>{
  //   console.log("This is the subTotal", subTotal);

  // },[subTotal])

  //this fires when the user save the invoice
  const handleSubmit = (e) => {
    e.preventDefault();
    updateInvoice(userInfo.token, invoice._id, {
      ...invoice,
      items,
      subTotal,
    }).then((res) => {
      console.log("Invoice Updated", res.data);
      history.push("/invoice");
    });
  };

  //this function will handle invoice number, duedate etc
  const handleInvoiceChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  // this function will insert new item in items array ...We will send this functions as props to FormItemTable
  const handleItemChange = (index, e) => {
    const value = [...items];
    value[index][e.target.name] = e.target.value;
    value[index].total = value[index].itemPrice * value[index].itemQuantity;

    // const subtotal = value.reduce((first, second)=>{
    //   return first.total+ second.total
    // })
    var subtotal = 0;
    for (let i = 0; i < value.length; i++) {
      subtotal += value[i].total;
    }
    //const subtotal = subTotal + value[index].itemPrice * value[index].itemQuantity
    setItems(value);
    setSubTotal(subtotal);
  };

  //remove the item from the items array
  const handleRemove = (index) => {
    const value = [...items];
    value.splice(index, 1);
    var subtotal = 0;
    for (let i = 0; i < value.length; i++) {
      subtotal += value[i].total;
    }
    setItems(value);
    setSubTotal(subtotal);
  };

  // we query our customer depending on the inputed text on Customer Name
  const handleClientSearch = (event, newInputValue) => {
    setCustomerFieldValue(newInputValue);
    setClientQ(newInputValue);
  };

  //this function will fire after selecting a customer from suggesed list
  const handleCustomerChange = (event, newValue) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({
          customerName: newValue,
          customerNumber: "",
          customerAddress: "",
        });
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue({
        customerName: newValue.inputValue,
        customerNumber: "",
        customerAddress: "",
      });
    } else if (newValue) {
      setCustomerFieldValue(newValue.customerName);
      setInvoice({
        ...invoice,
        customerId: newValue._id,
        customerName: newValue.customerName,
        customerNumber: newValue.customerNumber,
        customerAddress: newValue.customerAddress,
      });
    }
    if (!newValue) {
      setCustomerFieldValue("");
      console.log("this is new ", newValue);
      setInvoice({
        ...invoice,
        customerId: "",
        customerName: "",
        customerNumber: "",
        customerAddress: "",
      });
    }
  };
  //
  //   if (newValue) {
  //     setCustomerFieldValue(newValue.customerName);
  //     setInvoice({
  //       ...invoice,
  //       customerId: newValue._id,
  //       customerName: newValue.customerName,
  //       customerNumber: newValue.customerNumber,
  //       customerAddress: newValue.customerAddress,
  //     });
  //   }
  //   if (!newValue) {
  //     setCustomerFieldValue("");
  //     console.log("this is new ", newValue);
  //     setInvoice({
  //       ...invoice,
  //       customerId: "",
  //       customerName: "",
  //       customerNumber: "",
  //       customerAddress: "",
  //     });
  //   }
  // };

  const handleDialogClose = () => {
    setDialogValue({
      customerName: "",
      customerNumber: "",
    });

    toggleOpen(false);
  };

  const handleDialogSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/client/add`, dialogValue, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        setCustomerFieldValue(dialogValue.customerName);
        setInvoice({
          ...invoice,
          customerId: res.data._id,
          customerName: dialogValue.customerName,
          customerNumber: dialogValue.customerNumber,
          customerAddress: dialogValue.customerAddress,
        });
      });
    handleDialogClose();
  };

  return (
    <Paper variant="elevation" elevation={4} style={{ padding: "50px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid container xs={12} sm={6} spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                size="small"
                fullWidth
                id="combo-box-demo"
                value={invoice.customerName}
                onChange={handleCustomerChange}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      customerName: `Add "${params.inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                inputValue={
                  invoice.customerName
                    ? invoice.customerName
                    : customerFieldValue
                }
                onInputChange={handleClientSearch}
                options={clientOption}
                getOptionLabel={(option) => {
                  // e.g value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.customerName;
                  }
                  return option.customerName;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer Name"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                size="small"
                variant="outlined"
                required
                label="Customer Number"
                value={invoice.customerNumber}
                type="text"
                name="customerNumber"
                onChange={handleInvoiceChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Address"
                variant="outlined"
                type="text"
                className="form-control form-control-sm"
                name="customerAddress"
                value={invoice.customerAddress}
                onChange={handleInvoiceChange}
                required
                multiline
                InputLabelProps={{ shrink: true }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={6} spacing={3}>
            <Grid item xs={12}>
              <TextField
                disabled
                style={{ float: "right" }}
                size="small"
                label="Invoice No"
                variant="outlined"
                type="text"
                id="invoiceNumber"
                className="form-control form-control"
                name="invoiceNumber"
                value={invoiceNumber}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                style={{ float: "right" }}
                size="small"
                label="Invoice Date"
                variant="outlined"
                id="invoiceDate"
                type="date"
                className="form-control form-control"
                name="invoiceDate"
                value={dayjs(Date(invoiceDate)).format("YYYY-MM-DD")}
                onChange={handleInvoiceChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ float: "right" }}
                size="small"
                label="Due Date"
                variant="outlined"
                id="dueDate"
                type="date"
                className="form-control form-control"
                name="dueDate"
                defaultValue={dayjs(Date(dueDate)).format("YYYY-MM-DD")}
                value={dayjs(Date(dueDate)).format("YYYY-MM-DD")}
                onChange={handleInvoiceChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>

        <br></br>

        <FormItemTable
          items={items}
          setItems={setItems}
          handleItemChange={handleItemChange}
          handleRemove={handleRemove}
          subTotal={subTotal}
          setTotal={setSubTotal}
        />

        <Grid container>
          <Grid item xs={12} sm={3} lg={3}>
            <TextField
              label="Note"
              variant="outlined"
              multiline
              rows={1}
              id="note"
              type="text"
              className="form-control"
              name="note"
              value={note}
              onChange={handleInvoiceChange}
            />
          </Grid>
          <Grid container direction="column" xs={12} sm={8} lg={8}>
            <Grid item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="h6" color="primary">
                Sub Total :${subTotal}
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: "13px" }}>
              <Typography style={{ float: "right" }} variant="h6">
                Discount :{`   `}{" "}
                <TextField
                  style={{ textAlign: "end", maxWidth: "150px" }}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={1}
                  id="discount"
                  type="number"
                  className="form-control"
                  name="discount"
                  value={discount}
                  onChange={handleInvoiceChange}
                />
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: "13px" }}>
              <Typography style={{ float: "right" }} variant="h6">
                Paid :{`   `}{" "}
                <TextField
                  style={{ textAlign: "end", maxWidth: "150px" }}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={1}
                  id="paid"
                  type="number"
                  className="form-control"
                  name="paid"
                  value={paid}
                  onChange={handleInvoiceChange}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        {error && (
          <Alert
            variant="standard"
            color="error"
            size="small"
            style={{ margin: "5px" }}
          >
            {error}
          </Alert>
        )}
        <Grid container spacing={3} justify="flex-end">
          <Grid item>
            <Button size="large" variant="outlined" color="primary">
              Preview
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmit}
              type="submit"
            >
              Save And Continue
            </Button>
          </Grid>
        </Grid>
      </form>
      <FormNewCustomerDialog
        open={open}
        handleDialogClose={handleDialogClose}
        handleDialogSubmit={handleDialogSubmit}
        dialogValue={dialogValue}
        setDialogValue={setDialogValue}
      />
    </Paper>
  );
}
