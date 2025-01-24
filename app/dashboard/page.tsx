import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTenants } from "../actions/tenantActions";

export default async function Dashboard() {
  const tenants = (await getTenants()) || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-10 px-24 w-full">
      <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Link href="/tenants/new">
          <Button>Create New Tenant</Button>
        </Link>
      </div>
      {tenants.length ? (
        <div className="w-full flex flex-col items-start justify-center gap-10">
          <h1 className="text-2xl font-bold">Tenants</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            {tenants.map((tenant) => (
              <Link key={tenant.id} href={`/tenants/${tenant.id}`}>
                <div className="border p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <h2 className="text-xl font-semibold">
                    {tenant.tenant_name}
                  </h2>
                  <p className="text-gray-500">{tenant.id}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-2xl font-bold text-center">
          No tenant data available ...
        </p>
      )}
    </main>
  );
}
