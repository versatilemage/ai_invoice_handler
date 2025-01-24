"use client";

import { useState, useEffect } from "react";
import DynamicRenderer from "@/components/molecules/dynamic-ui";

import { useParams } from "next/navigation";

export default function IndividualInvoiceData() {
  const [summary, setSummary] = useState(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { invoiceId } = useParams();

  const handleCollectIndividualInvoiceData = async () => {
    try {
      const response = await fetch(`/api/invoice/${invoiceId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.data) {
        setFileUrl(data.data.file_url);
        setSummary(data.data.invoice_data);
        setError(null);
      }
    } catch (err: any) {
      console.error("Failed to collect data:", err.message);
      setError("Failed to collect invoice. Please try again.");
      setSummary(null);
    }
  };

  useEffect(() => {
    handleCollectIndividualInvoiceData();
  }, [invoiceId]);

  return (
    <div className="flex sm:flex-row flex-col items-start justify-center w-full min-h-screen px-20 py-10">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <div className="flex flex-col items-center justify-center w-full h-full rounded-lg overflow-hidden">
          <iframe src={fileUrl} width="600" height="850"></iframe>
        </div>
      )}
      {!summary ? (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <p>Invalid ID provided</p>
        </div>
      ) : (
        <div className="w-full p-6 flex flex-col items-center gap-5 max-w-[900px] bg-gray-300">
          <DynamicRenderer data={summary} />
        </div>
      )}
    </div>
  );
}
