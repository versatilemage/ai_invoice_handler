"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import DynamicRenderer from "@/components/ui/dynamic-ui";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [summary, setSummary] = useState(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!files || !Array.isArray(files)) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("invoice", files[0]);

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
    } catch (err: any) {
      console.error("Failed to upload file:", err.message);
      setError("Failed to process the file. Please try again.");
      setSummary(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="w-full max-w-4xl m-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col items-center justify-center p-4">
        <FileUpload onChange={handleFileUpload} />
        <button
          className="bg-sky-500 p-2 rounded-lg my-auto w-20 text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <iframe src={fileUrl} width="800" height="600"></iframe>
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
