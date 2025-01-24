"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { createCustomer, getCustomers } from "@/app/actions/customerActions";

import { CustomerDataType } from "@/types/users.type";
import { API_RESPONSE_STATUS_CODE } from "@/lib/enum/auth.enum";
import Link from "next/link";

export default function NewCustomer({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customers, setCustomers] = useState<CustomerDataType[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createCustomer(params.id, name, email);

    if (res.status === API_RESPONSE_STATUS_CODE.SUCCESS) {
      toast({
        title: "Customer added successfully",
        description: "You can now manage this customer",
      });
      router.push(`/tenants/${params.id}`);
    } else {
      toast({
        title: "Error adding customer",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function fetchCustomerData() {
      const data = await getCustomers(params.id);
      setCustomers(data);
    }
    fetchCustomerData();
  }, [params.id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-10 px-24 w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-bold mb-8">New Customer</h1>
        <div></div>
      </div>
      <div className="flex items-start justify-between w-full gap-6">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:max-w-md flex flex-col gap-6 bg-slate-100 p-6 rounded-lg"
        >
          <div className="mb-4 flex flex-col gap-3">
            <Label>Customer Name</Label>
            <Input
              type="text"
              className="bg-white"
              placeholder="Enter customer name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex flex-col gap-3">
            <Label>Customer Email</Label>
            <Input
              type="email"
              className="bg-white"
              placeholder="Enter customer email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Add Customer</Button>
        </form>
        <div className="w-full h-full min-h-[70vh] bg-slate-100 p-6 rounded-lg hidden lg:flex flex-col items-start justify-start">
          <h1 className="text-2xl font-bold mb-8">Customer list</h1>
          <ul>
            {customers.length ? (
              customers.map((invoice: any) => (
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
        </div>
      </div>
    </main>
  );
}
