"use client";

import { useState, useEffect } from "react";
import DynamicRenderer from "@/components/ui/dynamic-ui";

import { useParams } from "next/navigation";

export default function Home() {
  const [summary, setSummary] = useState(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const handleCollectIndividualInvoiceData = async () => {
    try {
      const response = await fetch(`/api/invoice/${id}`);

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
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <iframe src={fileUrl} width="800" height="600"></iframe>
        </div>
      )}
      {!summary ? (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <p>Invalid ID provided</p>
        </div>
      ) : (
        <div className="w-full p-6 flex flex-col items-center gap-5 mt-10 max-w-[900px] bg-gray-300">
          <DynamicRenderer data={summary} />
        </div>
      )}
    </div>
  );
}
