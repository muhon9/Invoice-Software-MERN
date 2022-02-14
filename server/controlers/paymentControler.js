import expreess from "express";
import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceModel.js";
import Payment from "../models/paymentModel.js";

//@description Get single invoice payments
//@route GET/payment/list/:invoice._id
//@access Private

export const singleInvoicePayment = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find({
      invoiceId: req.params.invoice_id,
    }).sort([["paymentDate", "desc"]]);
    res.json(payments);
  } catch (error) {
    res.status(401);
    throw new Error("Couldn't find");
  }
});

//@description Get the list of all the payments
//@route GET/payment/list
//@access Private

export const listPayment = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(401);
    throw new Error("No payments");
  }
});

//@description Add a payment
//@route POST/payment/add
//@access Private

export const addPayment = asyncHandler(async (req, res) => {
  //console.log("Payment", req.body);
  try {
    //save the  payment
    const payment = await Payment.create(req.body);
    //get all the payments made for this invoice
    const payments = await Payment.find({ invoiceId: req.body.invoiceId });
    const paidTotal = payments.reduce((accumulator, next) => {
      return accumulator + parseInt(next.amount);
    }, 0);
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.body.invoiceId },
      { ...req.body, paid: paidTotal },
      {
        new: true,
      }
    );
    invoice.save();

    res.json(payment);
  } catch (error) {
    res.status(401);
    throw new Error("Couldn't Save the Payment");
  }
});
