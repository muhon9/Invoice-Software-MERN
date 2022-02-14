import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as dayjs from "dayjs";
import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import CustomButton from "../CustomComponents/CustomButton";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";

import { makeStyles } from "@material-ui/core/styles";
import PaymentForm from "./PaymentForm";
import {
  addPayment,
  singleInvoicePayment,
} from "../../functions/paymentFunction";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "25px",
  },

  paper: {
    boxSizing: "borderBox",
    margin: "0 auto",
    marginTop: "20px",
    width: "794px",
    border: "1px solid transparent",
  },
}));

export default function PaymentCard({ invoice }) {
  const classes = useStyles();
  //Default Invoice date
  var date = new Date(); // this is today date
  const todayDate = dayjs(date).format("YYYY-MM-DD"); // formated version for setting default
  const { userInfo } = useSelector((state) => state.loginUser);

  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    invoiceId: invoice._id,
    paymentDate: todayDate,
    amount: 0,
    method: "",
    note: "",
  });

  useEffect(() => {
    singleInvoicePayment(userInfo.token, invoice._id).then((res) => {
      console.log("Invoices", res.data);
      setPayments(res.data);
    });
  }, [open, success, invoice._id, userInfo.token]);

  const handleDialogClose = () => {
    setDialogValue({
      invoiceId: invoice._id,
      paymentDate: todayDate,
      amount: null,
      method: "",
      note: "",
    });

    setOpen(false);
    setSuccess(false);
  };

  const handleClick = () => {
    console.log("Clicked Button");
    setOpen(true);
  };

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    addPayment(userInfo.token, dialogValue).then((res) => {
      setSuccess(true);
      setOpen(false);
      console.log("Succes", res.data);
    });
  };

  return (
    <div>
      <Paper elevation={1} className={classes.paper}>
        <Grid container className={classes.root}>
          <Grid item xs={1} justify='flex-start'>
            <PaymentRoundedIcon color='primary' />
          </Grid>
          <Grid item xs={10}>
            <Grid container direction='column'>
              <Grid container justify='space-between'>
                <Typography variant='h5'>Get Paid</Typography>
                <CustomButton onClick={() => handleClick()}>
                  Make A Payment
                </CustomButton>
              </Grid>
              <Grid container>
                <Typography variant='body1'>
                  <b>Amount Due:</b> Tk {invoice.due}
                </Typography>
              </Grid>
              <Divider style={{ margin: "20px 0" }} />
              <Grid container>
                <div>
                  <Typography align='left' variant='h6'>
                    Payment History:{" "}
                  </Typography>
                  {payments.length > 0 &&
                    payments.map((payment) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: "10px",
                        }}
                      >
                        <Typography variant='body1' align='left'>
                          {dayjs(payment.paymentDate).format("LL")} - A Payment
                          of <b>TK {payment.amount}</b> was made using{" "}
                          {payment.method}.
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Button color='primary'>Edit Payment</Button>
                          <Button color='primary'>Remove Payment</Button>
                        </div>
                      </div>
                    ))}
                  {payments.length < 1 && (
                    <Typography>No Payments Were Made</Typography>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <PaymentForm
        open={open}
        todayDate={todayDate}
        handleDialogClose={handleDialogClose}
        dialogValue={dialogValue}
        setDialogValue={setDialogValue}
        handleDialogSubmit={handleDialogSubmit}
        success={success}
        setSuccess={setSuccess}
      />
    </div>
  );
}
