import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

export default function PDFViewer() {
  const [file, setFile] = useState("./sample.pdf");
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <>
      <div>
        <div>
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <div>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages }, (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
          </Document>
        </div>
      </div>
    </>
  );
}