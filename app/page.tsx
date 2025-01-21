"use client";

import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("invoice", selectedFile);

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSummary(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to upload file:", err.message);
      setError("Failed to process the file. Please try again.");
      setSummary(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Invoice Summarization</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput">Upload Invoice (PDF): </label>
          <input
            id="fileInput"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={!selectedFile}>
          Submit
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h2>Invoice Summary</h2>
          <pre style={{ background: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(summary, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
