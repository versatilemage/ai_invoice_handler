"use server";

import connectMongo from "@/lib/Database";
import {
  TENANT_PROVIDED_ROLES,
  API_RESPONSE_STATUS_CODE,
} from "@/lib/enum/auth.enum";
import Customer from "@/models/customer";
import Invoice from "@/models/invoices";
import Tenant from "@/models/tenant";

export async function createTenant(name: string, email: string) {
  await connectMongo();
  const tenant = new Tenant({
    tenant_name: name,
    email,
    role: TENANT_PROVIDED_ROLES.TENANT,
  });
  await tenant.save();
  return { status: API_RESPONSE_STATUS_CODE.SUCCESS };
}

export async function getTenants() {
  await connectMongo();
  return Tenant.find({});
}

export async function getIndividualTenant(tenantId: string) {
  await connectMongo();
  try {
    // Execute the queries and await the results
    const tenant = await Tenant.findOne({ _id: tenantId }).lean(); // Use `.lean()` if you want plain objects
    const customers = await Customer.find({ tenant_id: tenantId }).lean();
    const invoices = await Invoice.find({ tenant_id: tenantId }).lean();

    // Structure the response
    return {
      ...tenant,
      customers,
      invoices,
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }

}
