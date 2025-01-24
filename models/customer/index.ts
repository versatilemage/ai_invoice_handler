import mongoose, { Schema, Model } from "mongoose";

import { CustomerDataType } from "@/types/users.type";

import { TENANT_PROVIDED_ROLES } from "@/lib/enum/auth.enum";

const CustomerSchema = new Schema<CustomerDataType>(
  {
    customer_name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(TENANT_PROVIDED_ROLES),
      default: TENANT_PROVIDED_ROLES.CUSTOMER,
    },
    tenant_id: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

let Customer: Model<CustomerDataType>;

try {
  Customer = mongoose.model<CustomerDataType>("Customer");
} catch (error) {
  Customer = mongoose.model<CustomerDataType>("Customer", CustomerSchema);
}

export default Customer;
