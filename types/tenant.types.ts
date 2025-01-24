import { TENANT_PROVIDED_ROLES } from "@/lib/enum/auth.enum";

import { Document } from "mongoose";

export interface tenantDataType extends Document {
  tenant_name: string;
  email: string;
  role: TENANT_PROVIDED_ROLES.TENANT;
}
