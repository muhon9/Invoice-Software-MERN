import expreess from "express";

import asyncHandler from "express-async-handler";
import Client from "../models/clientModel.js";

//@description Add client to the database
//@route POST/client/add
//@access Private

export const addClient = asyncHandler(async (req, res) => {
  //console.log("User", req.user);
  try {
    const client = await Client.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.json(client);
  } catch (error) {
    res.status(401);
    throw new Error("Couldn't create Client");
  }
});

//@description Get the list of the clients
//@route GET/client/list
//@access Private

export const listClient = asyncHandler(async (req, res) => {
  //console.log("Query", req.query);
  const { sortOption, orderOption, page, rowsPerPage } = req.query;

  const perpage = parseInt(rowsPerPage) || 10;
  const currentpage = 1;
  const sort = sortOption || "createdAt";
  const order = orderOption || "desc";
  console.log("perpage", sort);

  try {
    const clients = await Client.find({})
      .skip(page * perpage)
      .sort([[sort, order]])
      .limit(perpage);

    res.json(clients);
  } catch (error) {
    res.status(401);
    throw new Error("No client found");
  }
});

//@description Get the list of the clients for searched query
//@route GET/client/listquery
//@access Private

export const listQueryClient = asyncHandler(async (req, res) => {
  //console.log("Query", req.query);
  const { q } = req.query;

  try {
    const clients = await Client.find({
      customerName: { $regex: q, $options: "i" },
    });

    res.json(clients);
  } catch (error) {
    res.status(401);
    throw new Error("No client found");
  }
});

//@description Get amount of total clients
//@route GET/client/totalClients
//@access Private

export const totalClients = asyncHandler(async (req, res) => {
  try {
    const totalClients = await Client.find({}).estimatedDocumentCount().exec();

    res.json(totalClients);
  } catch (error) {
    res.status(401);
    throw new Error("Couldn't count total clients");
  }
});
