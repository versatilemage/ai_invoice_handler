import mongoose, { Schema, Model } from "mongoose";
import { invoicesHandlerType } from "@/types/invoices.type";

const InvoiceSchema = new Schema<invoicesHandlerType>(
  {
    file_name: { type: String, required: true },
    file_url: { type: String, required: true },
    invoice_data: { type: Schema.Types.Mixed, required: true },
    marker: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

let Invoice: Model<invoicesHandlerType>;

try {
    Invoice = mongoose.model<invoicesHandlerType>("Invoice");
} catch (error) {
    Invoice = mongoose.model<invoicesHandlerType>("Invoice", InvoiceSchema);
}

export default Invoice;
