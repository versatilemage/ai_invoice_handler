"use client";

import { useState, useEffect } from "react";
import { invoicesHandlerType } from "@/types/invoices.type";
import Link from "next/link";

const InvoicesHistoryPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [invoicesList, setInvoicesList] = useState<invoicesHandlerType[]>([]);

  useEffect(() => {
    const handleCollect = async () => {
      try {
        const response = await fetch("/api/invoice");
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setInvoicesList(data.data);
            setError(null);
          }
        }
      } catch (err: any) {
        console.log("err", err);
        setError("something went wrong");
      }
    };
    handleCollect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full mt-20">
      <div className="flex flex-col items-center justify-start gap-4 w-8/12 p-4">
        <h1 className="font-bold text-2xl">Invoice History</h1>
        {invoicesList.map((ele) => {
          return (
            <Link
              href={`/tenants/${ele.tenant_id}/invoices/${ele.id}`}
              key={ele._id as string}
              className="flex items-start justify-between gap-3 p-2 w-full bg-slate-200 rounded-lg min-h-[100px] max-h-[200px]"
            >
              <div className="flex rounded-3xl overflow-hidden">
                <iframe src={ele.file_url}></iframe>
              </div>
              <div className="flex flex-col items-start justify-between w-full h-full gap-4">
                <p className="text-2xl font-medium">{ele.file_name}</p>
                <Link href={ele.file_url} className="mt-auto">
                  {ele.file_url}
                </Link>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default InvoicesHistoryPage;
