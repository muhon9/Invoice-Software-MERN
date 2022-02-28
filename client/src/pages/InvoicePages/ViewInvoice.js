import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import {
  PDFDownloadLink,
  Page,
  View,
  Text,
  Document,
  Image,
} from "@react-pdf/renderer";

import {
  Button,
  Grid,
  Container,
  Typography,
  Divider,
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

import IconExpandMore from "@material-ui/icons/ExpandMore";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";

import { singleInvoiceAction } from "../../actions/invoiceActions";
import InvoiceCopy from "../../components/Invoice/InvoiceCopy";
import DownloadInvoicePDF from "../../components/Invoice/DownloadInvoicePDF";
import PaymentCard from "../../components/Payment/PaymentCard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: "50px",
  },
  paper: {
    width: "100%",
  },
}));

export default function ViewInvoice({ history, match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);

  const { invoice_id } = match.params;
  const { loading, success, error, invoice } = useSelector(
    (state) => state.singleInvoice
  );

  const headerPart = () => (
    <Grid container>
      <Grid item lg={3}>
        <h2 style={{ float: "left" }}>Invoice # {invoice.invoiceNumber}</h2>
      </Grid>
      <Grid item xs={3} lg={4}></Grid>
      <Grid item sm={3} lg={3}>
        <div>
          <Button
            color="primary"
            style={{ borderRadius: "20px" }}
            variant="contained"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            size="large"
          >
            More Actions <IconExpandMore />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      {/* <MenuItem onClick={handleClose}>
                        <ReactToPrint
                          trigger={() => <div>Print</div>}
                          content={() => componentRef.current}
                        />
                      </MenuItem> */}
                      {/* <MenuItem onClick={handleClose}>Download PDF</MenuItem> */}
                      <MenuItem
                        onClick={() =>
                          history.push(`/invoice/${invoice_id}/edit`)
                        }
                      >
                        Edit
                      </MenuItem>
                      {/* <MenuItem onClick={handleClose}>Delete</MenuItem> */}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Grid>
      <Grid item sm={3} lg={2}>
        <Button
          fullWidth
          style={{ borderRadius: "20px" }}
          size="large"
          variant="contained"
          color="primary"
          onClick={() => history.push("/invoice/add")}
        >
          Create New
        </Button>
      </Grid>
    </Grid>
  );

  //functions
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(singleInvoiceAction(invoice_id));
  }, [invoice_id, dispatch]);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      {loading && <div>Loading.....</div>}
      {invoice && (
        <Container>
          {headerPart()}
          <Divider></Divider>
          <br />
          <div
            style={{
              boxSizing: "borderBox",
              margin: "0 auto",
              marginTop: "20px",
              width: "794px",
              border: "1px solid transparent",
            }}
          >
            <Grid container justify="flex-start">
              <Grid container direction="column" xs={2}>
                <Typography align="left" variant="body2">
                  Status
                </Typography>
                <div
                  style={{
                    backgroundColor:
                      invoice.status === "Unpaid"
                        ? "rgba(255, 0, 0, 0.5)"
                        : invoice.status === "Partial"
                        ? "rgb(33,33,33, 0.5)"
                        : "rgb(76, 175, 80, 0.8)",
                    color: "white",
                    borderRadius: "3px 8px 8px 3px",
                    maxWidth: "60px",
                    padding: "3px",
                  }}
                >
                  {invoice.status}
                </div>
              </Grid>
              <Grid container direction="column" xs={6}>
                <Typography align="left" variant="body2">
                  Customer
                </Typography>
                <Typography align="left" variant="h6" color="primary">
                  {invoice.customerName}
                </Typography>
              </Grid>
              <Grid container direction="column" xs={2}>
                <Typography align="left" variant="body2">
                  Total Bill
                </Typography>
                <Typography align="left" variant="h6" color="primary">
                  TK {invoice.subTotal}
                </Typography>
              </Grid>
              <Grid container direction="column" xs={2}>
                <Typography align="left" variant="body2">
                  Amount Due
                </Typography>
                <Typography align="left" variant="h6" color="primary">
                  TK {invoice.due}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div>
            <PaymentCard invoice={invoice} />
          </div>
          <div>
            <Grid container className={classes.root}>
              <InvoiceCopy
                ref={componentRef}
                id="invoiceToPrint"
                invoice={invoice}
              />
            </Grid>
          </div>
          <Grid container style={{ marginTop: "12px" }}>
            <Grid item xs={0} md={8} lg={8}></Grid>
            <Grid item xs={0} md={4} lg={4}>
              {" "}
              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      variant="contained"
                      startIcon={<LocalPrintshopIcon color="primary" />}
                    >
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container>
            <PDFDownloadLink document={<DownloadInvoicePDF />}>
              Download me
            </PDFDownloadLink>
          </Grid>
        </Container>
      )}
    </>
  );
}
