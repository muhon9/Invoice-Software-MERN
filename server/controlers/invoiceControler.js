import expreess from "express";

import asyncHandler from "express-async-handler";
import Invoice from "../models/invoiceModel.js";
import _ from "lodash";

//@description Add invoice to the database
//@route POST/invoice/add
//@access Private

export const addInvoice = asyncHandler(async (req, res) => {
  //console.log("User", req.body);

  const { items } = req.body;
  const subTotal = items.reduce((accumulator, next) => {
    return accumulator + parseInt(next.total);
  }, 0);
  //const due = subTotal - parseInt(req.body.discount);
  //console.log("DUE, PAID< SUBTOTAL", due, req.body.paid, subTotal);

  const exist = await Invoice.findOne({
    invoiceNumber: req.body.invoiceNumber,
  });

  if (exist) {
    res.status(401);
    throw new Error("Invoice Number Already Exist");
  } else {
    const invoice = await Invoice.create({
      ...req.body,
      subTotal,
      createdBy: req.user._id,
    });
    res.json(invoice);
  }
});

//@description Get the details of an invoice
//@route GET/invoice/:invice_id
//@access Private

export const singleInvoice = asyncHandler(async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoice_id);
    res.json(invoice);
  } catch (error) {
    res.status(401);
    throw new Error("Couldn't find the invoice");
  }
});

//@description Update the details of an invoice
//@route PUT/invoice/:invice_id
//@access Private

export const updateInvoice = asyncHandler(async (req, res) => {
  delete req.body["_id"];
  delete req.body["invoiceNumber"];
  const { items, paid, discount } = req.body;
  const subTotal = items.reduce((accumulator, next) => {
    return accumulator + parseInt(next.total);
  }, 0);
  // const due = subTotal - paid - discount;
  // var status = null;
  // if (due === 0) {
  //   status = "Paid";
  // } else if (due === subTotal) {
  //   status = "Unpaid";
  // } else {
  //   status = "Partial";
  // }
  // const invoice = Invoice.findById(req.params.invoice_id, function (err, doc) {
  //   if (doc) {
  //     console.log("Doc ", doc);
  //     doc = { ...req.body, subTotal };
  //     console.log("Doc ", doc);
  //     doc.save(function (err) {
  //       console.log("Error");
  //       // do something;
  //     });
  //   }
  // });
  // res.json({ ok: true });
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.invoice_id },
      { ...req.body, subTotal },
      {
        new: true,
      }
    );

    invoice.save(); //to triger the pre "save" hook
    res.json(invoice);
    console.log("Trig trig", subTotal);
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Couldn't update the invoice");
  }
});

//@description Delete an invoice
//@route DELETE/invoice/:invice_id
//@access Private

export const deleteInvoice = asyncHandler(async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.invoice_id);
    res.json({ success: true });
  } catch (error) {
    res.status(401);
    throw new Error("Couldn't delete the invoice");
  }
});

//@description Get the list of the invoices
//@route GET/invoice/list
//@access Private

export const listInvoice = asyncHandler(async (req, res) => {
  console.log("Query", req.query);
  const {
    clientId,
    createdById,
    status,
    start_date,
    end_date,
    invoiceNo,
    page,
    rowsPerPage,
  } = req.query;
  const perpage = parseInt(rowsPerPage) || 10;
  const currentpage = 1;
  console.log("User is admin", req.user._id);
  const filterOption = {};

  //if its admin we want to show all the invoices, otherwise the user will see only the invoices created by him
  if (req.user.isAdmin) {
  } else {
    filterOption["createdBy"] = req.user._id;
  }

  if (invoiceNo !== "") {
    try {
      const invoices = await Invoice.find({ invoiceNumber: invoiceNo });
      res.json({ totalInvoices: 1, invoices });
    } catch (error) {
      res.status(401);
      throw new Error("No invoice found with this invoice number");
    }
  }

  if (clientId) {
    filterOption["clientId"] = clientId;
  }
  if (createdById) {
    filterOption["createdBy"] = createdById;
  }
  if (status) {
    filterOption["status"] = status;
  }
  if (start_date) {
    filterOption["invoiceDate"] = {
      ...filterOption.invoiceDate,
      $gte: start_date,
    };
  }
  if (end_date) {
    filterOption["invoiceDate"] = {
      ...filterOption.invoiceDate,
      $lte: end_date,
    };
  }

  console.log("filterOption", filterOption);

  // if (!filter["createdById"]) {
  //   delete filter["createdById"];
  // }
  // filter["status"] = { $gte: 100 };
  // console.log("User", filter);

  // if (!createdById) {
  // }
  // const d = _.omitBy(filter, _.isNil);

  try {
    const totalInvoicesList = await Invoice.find(filterOption);
    const totalInvoices = totalInvoicesList.length;
    const invoices = await Invoice.find(filterOption)
      .skip(page * perpage)
      .limit(perpage)
      .sort([["invoiceDate", "desc"]]);

    res.json({ totalInvoices, invoices });
  } catch (error) {
    res.status(401);
    throw new Error("No invoice found");
  }
});

//@description Get amount of total invoices
//@route GET/invoice/totalInvoicess
//@access Private

export const totalInvoices = asyncHandler(async (req, res) => {
  try {
    const totalInvoices = await Invoice.find({})
      .estimatedDocumentCount()
      .exec();

    res.json(totalInvoices);
  } catch (error) {
    res.status(401);
    throw new Error("Couldn't count total invoices");
  }
});
