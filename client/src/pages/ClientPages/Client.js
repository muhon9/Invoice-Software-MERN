import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listClientsAction } from "../../actions/clientActions";
import SearchIcon from "@material-ui/icons/Search";

import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getTotalClients } from "../../functions/clientFunctions";

const useStyles = makeStyles((theme) => ({
  headCell: {
    color: "#1F65A6",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Client({ history }) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { loading, clientsList, success, error } = clients;
  const { userInfo } = useSelector((state) => state.loginUser);
  const classes = useStyles();
  const [sortOption, setSortOption] = useState("");
  const [orderOption, setOrderOption] = useState("desc");
  const [totalClients, setTotalClients] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getTotalClients(userInfo.token).then((res) => {
      setTotalClients(res.data);
    });
  }, [userInfo.token]);

  useEffect(() => {
    dispatch(listClientsAction(sortOption, orderOption, page, rowsPerPage));
  }, [dispatch, page, rowsPerPage, sortOption, orderOption]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const handleSort = () => {
    setSortOption("customerName");
    setOrderOption(orderOption === "asc" ? "desc" : "asc");
    setPage(0);
  };

  return (
    <>
      <>
        <Grid container>
          <Grid item xs={7} sm={7} lg={2}>
            <Typography variant='h5' style={{ float: "left" }}>
              Customers
            </Typography>
          </Grid>
          <Grid item xs={5} lg={8}></Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <Button
              fullWidth
              style={{ borderRadius: "20px" }}
              size='large'
              variant='contained'
              color='primary'
              onClick={() => history.push("/customer/add")}
            >
              Add a Customer
            </Button>
          </Grid>
        </Grid>
        <br />
        <Grid container alignContent='center' justify='center'>
          <Grid item xs={7} sm={7} lg={3}>
            <TextField
              variant='outlined'
              size='small'
              id='input-with-icon-textfield'
              placeholder='Search Customer'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={2}>
            <Typography>{totalClients} Customers found</Typography>
          </Grid>
          <Grid item xs={0} lg={7}></Grid>
        </Grid>
        <br />

        <Grid container>
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.headCell} variant='head'>
                  Name
                  <IconButton onClick={handleSort}>
                    <SortByAlphaIcon fontSize='small' />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.headCell} variant='head'>
                  Number
                </TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <div>Loading......</div>
            ) : (
              <TableBody>
                {clientsList &&
                  clientsList.map((client) => (
                    <StyledTableRow key={client._id}>
                      <TableCell>{client.customerName}</TableCell>
                      <TableCell>{client.customerNumber}</TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            )}
            <TablePagination
              style={{ alignContent: "center" }}
              component='div'
              count={totalClients}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 50, 100]}
            />
          </Table>
        </Grid>
      </>
    </>
  );
}
