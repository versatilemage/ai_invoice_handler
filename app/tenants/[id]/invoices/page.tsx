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
    <div className="flex flex-col items-center justify-center gap-4 w-full px-10 py-10">
      <div className="flex flex-col items-start justify-start gap-4 p-4">
        <h1 className="font-bold text-2xl">Invoice History</h1>
        <div className="flex flex-col lg:grid grid-cols-2 items-center justify-start w-full gap-4">
          {invoicesList.map((ele) => {
            return (
              <Link
                href={`/tenants/${ele.tenant_id}/invoices/${ele._id}`}
                key={ele._id as string}
                className="flex items-start justify-between gap-3 p-5 w-full bg-slate-200 rounded-xl min-h-[100px] max-h-[200px]"
              >
                <div className="flex rounded-lg overflow-hidden">
                  <iframe src={ele.file_url}></iframe>
                </div>
                <div className="flex flex-col items-start justify-between w-full h-full gap-4">
                  <p className="text-2xl font-medium">{ele.file_name}</p>
                  <Link href={ele.file_url} className="mt-auto">
                    {ele.file_url.length > 50 ? `${ele.file_url.slice(0, 50)}...` : ele.file_url}
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvoicesHistoryPage;
