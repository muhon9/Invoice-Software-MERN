import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: ObjectId,
      ref: "Invoice",
    },
    paymentDate: {
      type: Date,
      require: true,
    },
    amount: {
      type: Number,
    },
    method: {
      type: String,
      enum: ["cash", "bKash"],
    },

    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
