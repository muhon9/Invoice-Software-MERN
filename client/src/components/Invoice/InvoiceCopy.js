import React, { useEffect } from "react";
import * as dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
dayjs.extend(localizedFormat);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: "auto",
//     marginTop: "50px",
//   },
//   container: {
//     boxSizing: "borderBox",
//     margin: "0 auto",
//     height: "1022px",
//     width: "818px",
//   },

//   invoiceHeader: {
//     boxSizing: "borderBox",
//     marginTop: "50px",
//     marginLeft: "14px",
//   },

//   logo: {
//     boxSizing: "borderBox",
//     border: "1px solid red",
//     float: "left",
//   },
//   companydata: {
//     boxSizing: "borderBox",
//     border: "1px solid red",
//   },

//   logoimg: {
//     width: "300px",
//     height: "50px",
//   },
// }));

const company = {
  name: "ArrowNet",
  address: "4th Floor, Abid Mansion , Zindabazar",
  number: "01760881213",
  website: "www.arrownetsylhet.com",
};

const classes = {
  root: {
    margin: "auto",
    marginTop: "50px",
  },
  container: {
    boxSizing: "borderBox",
    margin: "0 auto",
    height: "1022px",
    width: "818px",
  },

  invoiceHeader: {
    margin: "0 25px",
    marginTop: "50px",
    height: "200px",
    display: "flex",
    justifyContent: "space-between",
  },

  logoimg: {
    width: "300px",
    height: "50px",
  },
  secondHeader: {
    margin: "0 25px",
    marginTop: "15px",
    height: "180px",
    display: "flex",
    justifyContent: "space-between",
  },
  tableHead: {
    fontColor: "#D41A1D",
    backgroundColor: "#D41A1D",
    height: "15px",
  },
};

export default class InvoiceCopy extends React.Component {
  render() {
    const {
      invoiceNumber,
      customerName,
      customerNumber,
      customerAddress,
      invoiceDate,
      dueDate,
      due,
      paid,
      note,
      subTotal,
      items,
    } = this.props.invoice;

    return (
      <Paper
        elevation={3}
        style={{
          boxSizing: "borderBox",
          margin: "0 auto",
          height: "1123px",
          width: "794px",
          border: "1px solid transparent",
        }}
      >
        <div style={classes.invoiceHeader}>
          <div>
            <img src='/logo.png' style={classes.logoimg} alt='logo' />
          </div>
          <div>
            <div>
              <Typography variant='h4' align='right'>
                INVOICE
              </Typography>
              <Typography variant='subtitle1' align='right'>
                <b>{company.name}</b>
              </Typography>
              <Typography paragraph align='right'>
                {company.address} <br /> Sylhet,Bangladesh
              </Typography>
              <Typography paragraph align='right'>
                Mobile: {company.number} <br /> {company.website}
              </Typography>
            </div>
          </div>
        </div>
        <Divider component='hr' />
        <div style={classes.secondHeader}>
          <div style={{ width: "280px" }}>
            <Typography paragraph align='left'>
              Bill to
              <br />
              <b>{customerName}</b>
            </Typography>
            <Typography paragraph align='left'>
              {customerAddress}
            </Typography>
            <Typography paragraph align='left'>
              Mobile: {customerNumber}
            </Typography>
          </div>
          <div>
            <div style={{ width: "250px", display: "flex" }}>
              <div>
                {" "}
                <Typography variant='body1' align='right'>
                  <b>Invoice Number:</b>
                  <br />
                  <b>Invoice Date:</b>
                  <br />
                  <b>Due Date:</b>
                  <br />
                  <b>Amount Due:</b>
                </Typography>
              </div>
              <div style={{ marginLeft: "10px" }}>
                {" "}
                <Typography variant='body1' align='left'>
                  {invoiceNumber}
                  <br />
                  {dayjs(invoiceDate).format("LL")}

                  <br />
                  {dayjs(dueDate).format("LL")}
                  <br />
                  <b>Tk {due}</b>
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Table>
            <TableHead>
              <TableRow style={classes.tableHead}>
                <TableCell align='left' style={{ paddingLeft: "28px" }}>
                  Items
                </TableCell>
                <TableCell align='center'>Quantity</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right' style={{ paddingRight: "40px" }}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.map((item, i) => (
                  <TableRow style={{ height: "10px" }} key={i}>
                    <TableCell
                      align='left'
                      style={{
                        paddingLeft: "28px",
                        width: "350px",
                      }}
                    >
                      <b>{item.itemName}</b>

                      <Typography
                        variant='caption'
                        style={{ marginLeft: "10px" }}
                      >
                        {item.itemDescription}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>{item.itemQuantity}</TableCell>
                    <TableCell align='right'>{item.itemPrice}</TableCell>
                    <TableCell
                      align='right'
                      style={{
                        paddingRight: "40px",
                        width: "150px",
                      }}
                    >
                      Tk {Number(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Divider />
          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "500px",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  variant='body2'
                  align='left'
                  style={{ marginBottom: "5px" }}
                >
                  <b>Notes / Terms</b>
                </Typography>
                <Typography paragraph variant='body2' align='left'>
                  {note ? note : "Have a nice day!!"}
                </Typography>
              </div>
              <div>
                <Typography
                  variant='body2'
                  align='right'
                  style={{ marginBottom: "8px" }}
                >
                  <b>Total: </b>
                </Typography>
                <Typography align='right' variant='body2'>
                  <b>Paid: </b>
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <Typography align='right' variant='body2'>
                  <b>Amount Due: </b>
                </Typography>
              </div>
              <div style={{ width: "110px", marginRight: "40px" }}>
                <Typography
                  align='right'
                  variant='body2'
                  style={{ marginBottom: "8px" }}
                >
                  Tk {subTotal}{" "}
                </Typography>
                <Typography align='right' variant='body2'>
                  Tk {paid}{" "}
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <Typography align='right' variant='body2'>
                  <b> Tk {due} </b>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}
