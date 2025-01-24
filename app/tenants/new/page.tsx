"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createTenant, getTenants } from "@/app/actions/tenantActions";

import { API_RESPONSE_STATUS_CODE } from "@/lib/enum/auth.enum";
import { tenantDataType } from "@/types/tenant.types";
import Link from "next/link";

export default function NewTenant() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tenants, setTenants] = useState<tenantDataType[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createTenant(name, email);
    if (res.status === API_RESPONSE_STATUS_CODE.SUCCESS) {
      toast({
        title: "Tenant added successfully",
        description: "You can now manage this tenant",
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Error adding tenant",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function fetchCustomerData() {
      const data = await getTenants();
      setTenants(data);
    }
    fetchCustomerData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-10 px-24 w-full">
      <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-4xl font-bold">New Tenant</h1>
        <div></div>
      </div>
      <div className="flex items-start justify-between w-full gap-6">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:max-w-md flex flex-col gap-6 bg-slate-100 p-6 rounded-lg"
        >
          <div className="mb-4">
            <Input
              type="text"
              className="bg-white"
              placeholder="Tenant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              className="bg-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Create Tenant</Button>
        </form>
        <div className="w-full h-full min-h-[70vh] bg-slate-100 p-6 rounded-lg hidden lg:flex flex-col items-start justify-start">
          <h1 className="text-2xl font-bold mb-8">Tenant list</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 items-center">
            {tenants.map((tenant) => (
              <Link key={tenant._id as string} href={`/tenants/${tenant._id}`}>
                <div className="border p-4 rounded-lg bg-white hover:bg-gray-200 transition-colors">
                  <h2 className="text-xl font-semibold">
                    {tenant.tenant_name}
                  </h2>
                  <p className="text-gray-500">{tenant._id as string}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
