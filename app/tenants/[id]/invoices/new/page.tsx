"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/molecules/file-upload";
import DynamicRenderer from "@/components/molecules/dynamic-ui";
import { useToast } from "@/hooks/use-toast";

export default function NewInvoicePage({ params }: { params: { id: string } }) {
  const [files, setFiles] = useState<File[]>([]);
  const [summary, setSummary] = useState(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const ID = params.id;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!files || !Array.isArray(files)) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("invoice", files[0]);
    formData.append("tenantId", ID as string);

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.data) {
        setFileUrl(data.data.file_url);
        setSummary(data.data.invoice_data);
        setError(null);
      }
      toast({
        title: "Invoice saved successfully",
        description: "You can now see the invoice parsed data",
      });
    } catch (err: any) {
      console.error("Failed to upload file:", err.message);
      setError("Failed to process the file. Please try again.");
      toast({
        title: "Error adding customer",
        description: "Please try again",
        variant: "destructive",
      });
      setSummary(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 min-h-screen">
      <div className="w-full max-w-4xl m-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col items-center justify-center p-4">
        {(!fileUrl || !files.length) && (
          <h1 className="text-2xl font-bold">Add new invoice</h1>
        )}
        <FileUpload onChange={handleFileUpload} />
        <div className="flex items-center gap-10">
          <button
            className="bg-sky-500 p-2 rounded-lg my-auto w-20 text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-500 p-2 rounded-lg my-auto w-20 text-white"
            onClick={() => router.push(`/tenants/${ID}/invoices`)}
          >
            History
          </button>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <iframe src={fileUrl} width="900" height="600"></iframe>
        </div>
      )}
      {summary && (
        <div className="w-full p-6 flex flex-col items-center gap-5 mt-10 max-w-[900px] bg-gray-300">
          <DynamicRenderer data={summary} />
        </div>
      )}
    </div>
  );
}
