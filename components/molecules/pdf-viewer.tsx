import React from "react";

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={fileUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Invoice PDF"
      />
    </div>
  );
};

export default PdfViewer;
