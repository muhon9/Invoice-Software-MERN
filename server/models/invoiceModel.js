import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: Number,
      require: true,
      unique: true,
    },

    customerId: {
      type: ObjectId,
      ref: "Client",
    },

    customerName: {
      type: String,
      require: true,
    },
    customerNumber: {
      type: String,
      require: true,
    },
    customerAddress: {
      type: String,
      require: true,
    },

    invoiceDate: {
      type: Date,
      require: true,
    },
    dueDate: {
      type: Date,
      require: true,
    },

    due: {
      type: Number,
    },
    paid: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
    },
    subTotal: {
      type: Number,
      require: true,
    },
    items: [],
    status: {
      type: String,
      enum: ["Unpaid", "Paid", "Partial"],
    },

    createdBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

invoiceSchema.pre("save", async function (next) {
  this.due = this.subTotal - this.paid - this.discount;
  console.log("Triggerd save", this.due);

  if (this.due === 0) {
    this.status = "Paid";
  } else if (this.due === this.subTotal) {
    this.status = "Unpaid";
  } else {
    this.status = "Partial";
  }
  next();
});

// invoiceSchema.pre("findOneAndUpdate", async function (next) {
//   console.log("Triggerd subTotal", this.subTotal);
//   this.due = this.subTotal - this.paid - this.discount;
//   console.log("Triggerd update", this.due);

//   if (this.due === 0) {
//     this.status = "Paid";
//   } else if (this.due === this.subTotal) {
//     this.status = "Unpaid";
//   } else {
//     this.status = "Partial";
//   }
//   next();
// });

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
