"use server";

import connectMongo from "@/lib/Database";
import { API_RESPONSE_STATUS_CODE, TENANT_PROVIDED_ROLES } from "@/lib/enum/auth.enum";
import Customer from "@/models/customer";

export async function createCustomer(
  tenantId: string,
  name: string,
  email: string
) {
  await connectMongo();
  const customer = new Customer({
    tenant_id: tenantId,
    customer_name: name,
    email,
    role: TENANT_PROVIDED_ROLES.CUSTOMER,
  });
  await customer.save();
  return { status: API_RESPONSE_STATUS_CODE.SUCCESS };
}

export async function getCustomers(tenantId: string) {
  await connectMongo();
  return Customer.find({ tenant_id: tenantId });
}
