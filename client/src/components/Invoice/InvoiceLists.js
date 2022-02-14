import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//material ui library components
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import InvoiceListTable from "./InvoiceListTable";
import { makeStyles } from "@material-ui/core/styles";
import { listInvoicesAction } from "../../actions/invoiceActions";
import { listUsers } from "../../functions/userFunctions";
import {
  IconButton,
  InputAdornment,
  Select,
  TextField,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import { getTotalClients } from "../../functions/clientFunctions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  filter: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  selectInput: {
    height: "40px",

    [theme.breakpoints.down("sm")]: {
      minWidth: "280px",
    },
  },
}));

export default function InvoiceLists() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //these are used to make the start and end date type more user friendly
  const [startinputType, setStartInputType] = useState("text");
  const [endinputType, setEndInputType] = useState("text");

  //state to keep filtering options
  const [filterOptions, setFilterOptions] = useState({
    invoiceNo: "",
    status: "Unpaid",
    createdById: "",
    start_date: "",
    end_date: "",
  });
  const { userInfo } = useSelector((state) => state.loginUser);
  const { loading, success, error, totalInvoices, invoices } = useSelector(
    (state) => state.listInvoices
  );
  const dueInvoices =
    invoices && invoices.filter((invoice) => invoice.due !== 0);

  const loadInvoices = (filterOptions) => {
    dispatch(listInvoicesAction({ filterOptions, page, rowsPerPage }));
  };

  useEffect(() => {
    listUsers(userInfo.token).then((res) => {
      setUsers(res.data);
    });
    loadInvoices(filterOptions);
    console.log("Type", typeof totalInvoices);
  }, [dispatch, userInfo, page, rowsPerPage]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      setFilterOptions({ ...filterOptions, status: "Unpaid" });
      loadInvoices({ ...filterOptions, status: "Unpaid" });
    } else {
      setFilterOptions({ ...filterOptions, status: "" });
      loadInvoices({ ...filterOptions, status: "" });
    }
    setValue(newValue);
  };

  const handleUserFilterClick = (event, newValue) => {
    if (event.target.name === "status") {
      setValue(1);
    }

    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.value,
    });
    loadInvoices({
      ...filterOptions,
      [event.target.name]: event.target.value,
    });
  };

  const handleInvoiceNoSearch = (event) => {
    event.preventDefault();
  };

  //pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      <Grid className={classes.filter} spacing={1} container>
        <Grid item xs={12} sm={12} lg={2}>
          <form>
            <Select
              className={classes.selectInput}
              native
              autoWidth
              size='small'
              variant='outlined'
              value={filterOptions.createdById}
              onChange={handleUserFilterClick}
              inputProps={{
                name: "createdById",
              }}
              disabled={userInfo.isAdmin ? false : true}
            >
              <option value=''>Created By</option>
              {users &&
                users.map((user) => (
                  <option value={user._id}>{user.name}</option>
                ))}
            </Select>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} lg={2}>
          <form>
            <Select
              className={classes.selectInput}
              native
              size='small'
              variant='outlined'
              onChange={handleUserFilterClick}
              inputProps={{
                name: "status",
              }}
            >
              <option value=''>-Status-</option>
              <option value='Paid'>Paid</option>
              <option value='Unpaid'>Unpaid</option>
              <option value='Partial'>Partial</option>
            </Select>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} lg={3}>
          <form className={classes.container} noValidate>
            <TextField
              className={classes.selectInput}
              id='start_date'
              name='start_date'
              size='small'
              variant='outlined'
              label='From'
              placeholder='From'
              type={startinputType}
              onFocus={() => setStartInputType("date")}
              onBlur={() => setStartInputType("text")}
              value={filterOptions.start_date}
              onChange={handleUserFilterClick}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='center'>
                    {filterOptions.start_date && (
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setFilterOptions({
                            ...filterOptions,
                            start_date: "",
                          });
                          loadInvoices({
                            ...filterOptions,
                            start_date: "",
                          });
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={12} lg={3}>
          <form className={classes.container} noValidate>
            <TextField
              className={classes.selectInput}
              id='end_date'
              name='end_date'
              size='small'
              variant='outlined'
              label='To'
              placeholder='To'
              type={endinputType}
              onFocus={() => setEndInputType("date")}
              onBlur={() => setEndInputType("text")}
              value={filterOptions.end_date}
              onChange={handleUserFilterClick}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='center'>
                    {filterOptions.end_date && (
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setFilterOptions({
                            ...filterOptions,
                            end_date: "",
                          });
                          loadInvoices({
                            ...filterOptions,
                            end_date: "",
                          });
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={12} lg={2}>
          <form onSubmit={handleInvoiceNoSearch}>
            <TextField
              className={classes.selectInput}
              margin='none'
              variant='outlined'
              size='small'
              placeholder='Invoice No'
              onChange={handleUserFilterClick}
              name='invoiceNo'
              value={filterOptions.invoiceNo}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='center'>
                    <IconButton
                      type='submit'
                      color='primary'
                      value={filterOptions.invoiceNo}
                    >
                      <SearchIcon onClick={handleInvoiceNoSearch} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Grid>
      </Grid>
      <div className={classes.root}>
        <AppBar position='static' color='none' elevation={0}>
          <Tabs
            textColor='primary'
            value={value}
            onChange={handleTabChange}
            aria-label='simple tabs example'
            indicatorColor='primary'
          >
            <Tab label='Unpaid Invoices' {...a11yProps(0)} />
            <Tab label='All Invoices' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <InvoiceListTable invoices={invoices} />
          <TablePagination
            style={{ alignContent: "center" }}
            component='div'
            count={totalInvoices}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 50, 100]}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InvoiceListTable invoices={invoices} />
          <TablePagination
            style={{ alignContent: "center" }}
            component='div'
            count={totalInvoices}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={parseInt(rowsPerPage)}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 50, 100]}
          />
        </TabPanel>
      </div>
    </>
  );
}
