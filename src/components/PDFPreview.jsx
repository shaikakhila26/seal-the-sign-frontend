/* import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
//import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
//import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import 'react-pdf/dist/esm/Page/TextLayer.css';
//pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
//pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFPreview = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState('');

  return (
    <div className="mt-3 border p-2 bg-white shadow rounded">
      {error && <p className="text-red-600">⚠️ {error}</p>}
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => {
         // console.error("❌ PDF load error:", err);
          console.error('Preview failed for:', err);
        // console.error('Full error:', err);

          setError('Failed to load PDF file.');
        }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      
    </div>
  );
};

export default PDFPreview;
 */

 const PDFPreview = ({ fileUrl }) => (
  <div className="mt-3 border p-2 bg-white shadow rounded">
    <iframe
      src={fileUrl}
      title="PDF Preview"
      width="100%"
      height="600px"
      className="rounded border"
      
    />
  </div>
);

export default PDFPreview;
