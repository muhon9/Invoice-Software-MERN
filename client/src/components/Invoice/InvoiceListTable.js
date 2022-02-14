import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";

import ArrowDropDownCircleRoundedIcon from "@material-ui/icons/ArrowDropDownCircleRounded";

import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {},
  button: {
    color: "red",
  },
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 15,
    right: 0,
    left: -30,
    zIndex: 5000,
    listStyle: "none",
    border: ".5px solid gray",
    borderRadius: "5px",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: "1px 3px 3px",
  },
  list: {
    //color: "black",
    color: "black",
    textDecoration: "none",
  },
}));

export default function InvoiceListTable({ history, invoices }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClose = (event) => {
  //   console.log("evnet", event.currentTarget);
  //   console.log("evnet", event.target.id);
  //   setAnchorEl(event.currentTarget);
  //   if (event.target.id === activeMenu) {
  //     console.log("Trigger it");
  //     setActiveMenu(null);
  //     setOpen(!open);
  //   } else {
  //     setActiveMenu(event.target.id);
  //     setOpen(!open);
  //   }
  // };
  // const handleClick = (event) => {
  //   console.log("Hello", event.target);
  // };

  return (
    <TableContainer className={classes.table}>
      <Table>
        <TableHead color='primary'>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align='left'>Date</TableCell>
            <TableCell align='left'>Invoice No</TableCell>
            <TableCell align='left'>Customer</TableCell>
            <TableCell align='left'>Total</TableCell>
            <TableCell align='left'>Due</TableCell>
            <TableCell align='left'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices && invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell component='th' scope='row'>
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
                </TableCell>
                <TableCell align='left'>
                  {dayjs(invoice.invoiceDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align='left'>{invoice.invoiceNumber}</TableCell>
                <TableCell align='left'>{invoice.customerName}</TableCell>
                <TableCell align='left'>${invoice.subTotal}</TableCell>
                <TableCell align='left'>${invoice.due}</TableCell>

                <TableCell>
                  <Link
                    className={classes.list}
                    to={`/invoice/${invoice._id}/view`}
                  >
                    <Button variant='outlined' color='primary'>
                      View{" "}
                    </Button>
                  </Link>
                </TableCell>
                {/* <TableCell>
                  <Link to={`/invoice/${invoice._id}/view`}>View</Link>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                style={{ width: "100%", color: "green" }}
                align='center'
              >
                No Invoice Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
