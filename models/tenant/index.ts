import mongoose, { Schema, Model } from "mongoose";

import { tenantDataType } from "@/types/tenant.types";

import { TENANT_PROVIDED_ROLES } from "@/lib/enum/auth.enum";

const TenantSchema = new Schema<tenantDataType>(
  {
    tenant_name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(TENANT_PROVIDED_ROLES),
      default: TENANT_PROVIDED_ROLES.TENANT,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

let Tenant: Model<tenantDataType>;

try {
  Tenant = mongoose.model<tenantDataType>("Tenant");
} catch (error) {
  Tenant = mongoose.model<tenantDataType>("Tenant", TenantSchema);
}

export default Tenant;
