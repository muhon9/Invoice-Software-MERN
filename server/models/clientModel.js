import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      require: true,
      text: true,
    },
    customerNumber: {
      type: String,
      require: true,
      text: true,
    },
    customerAddress: {
      type: String,
      require: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
