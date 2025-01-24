import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getIndividualTenant } from "@/app/actions/tenantActions";

export default async function TenantPage({
  params,
}: {
  params: { id: string };
}) {
  const tenant = (await getIndividualTenant(params.id)) as any;

  if (!tenant) {
    return <div>Tenant not found</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-10 px-24 w-full gap-20">
      <div className="flex items-end justify-start w-full gap-3">
        <h1 className="text-4xl font-bold capitalize">{tenant.tenant_name}</h1>
        <p className="text-lg font-semibold">{`(${tenant.email})`}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full place-items-center">
          <div className="flex flex-col items-start gap-3 bg-slate-100 p-6 rounded-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Customers</h2>
            <ul>
              {tenant.customers.length ? (
                tenant.customers.map((customer: any) => (
                  <li key={customer._id} className="mb-2">
                    {customer.customer_name} ({customer.email})
                  </li>
                ))
              ) : (
                <li>No data found</li>
              )}
            </ul>
            <Link href={`/tenants/${tenant._id}/customers/new`}>
              <Button>Add New Customer</Button>
            </Link>
          </div>
          <div className="flex flex-col items-start gap-3 bg-slate-100 p-6 rounded-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Invoices</h2>
            <ul>
              {tenant.invoices.length ? (
                tenant.invoices.map((invoice: any) => (
                  <li key={invoice._id} className="mb-2">
                    <Link
                      href={`/tenants/${params.id}/invoices/${invoice._id}`}
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Invoice {invoice._id}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No data found</li>
              )}
            </ul>
            <Link href={`/tenants/${tenant._id}/invoices/new`}>
              <Button>Upload Invoice</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
