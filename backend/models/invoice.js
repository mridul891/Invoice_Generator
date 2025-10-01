import { Schema } from "mongoose";
import mongoose from "mongoose";

const ItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  taxPercentage: { type: Number, required: true },
  total: { type: Number, required: true },
});

const invoiceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    dueDate: { type: Date },
    billTo: {
      clientName: { type: String },
      address: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    billFrom: {
      businessName: { type: String },
      address: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    items: [ItemSchema],
    notes: {
      type: String,
    },
    paymentTerms: { type: String, default: "Net 15" },
    subTotal: { type: Number },
    taxTotal: { type: Number },
    totalAmount: { type: Number },
    status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
    notes: { type: String },
  },
  { timestamps: true }
);


const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;