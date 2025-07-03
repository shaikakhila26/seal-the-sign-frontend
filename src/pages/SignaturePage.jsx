import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import Draggable from 'react-draggable';
import { postSignature } from '../utils/api';
import '../index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const fonts = [
  'Pacifico', 'Roboto', 'Dancing Script', 'Indie Flower', 'Lora', 'Playfair Display',
  'Quicksand', 'Orbitron', 'Caveat', 'Zeyada', 'Great Vibes', 'Raleway',
  'Anton', 'Fira Sans', 'Ubuntu', 'Shadows Into Light', 'Kalam', 'Nunito',
  'Comfortaa', 'Signika'
];

export default function SignaturePage() {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState('');
  const [pageWidth] = useState(600);
  const [signature, setSignature] = useState(null);
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [font, setFont] = useState(fonts[0]);
  const [showToolbar, setShowToolbar] = useState(false);
  const dragRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [signedFileName, setSignedFileName] = useState('');
  const [isSignaturePlaced, setIsSignaturePlaced] = useState(false);
  const [placedCoords, setPlacedCoords] = useState(null);
   const [pdfDims, setPdfDims] = useState({ width: 842, height: 595 }); // default fallback
const [fontSize, setFontSize] = useState(24); // default size
const [dragging, setDragging] = useState(true); // default is now true ✅





const handleDocumentLoadSuccess = (pdf) => {
  console.log('✅ PDF Loaded:', pdf);
  setNumPages(pdf.numPages);

  // Get dimensions of first page
  pdf.getPage(1).then((page) => {
    const [x0, y0, x1, y1] = page.view;
    const width = x1 - x0;
    const height = y1 - y0;
    console.log('📐 PDF actual size:', width, height);
    setPdfDims({ width, height });
  });
};







  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/docs/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
const cleanPath = data.filePath.replace(/\\/g, '/');
const backendBase = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
const fullUrl = `${backendBase}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
setFileUrl(fullUrl);

        setFileUrl(fullUrl);
      } catch (err) {
        console.error('Failed to fetch PDF:', err);
      }
    };
    fetchDocument();
  }, [id]);

  const handlePlaceSignature = () => {
    if (!name.trim()) return alert('Please enter your full name');
    if (isSignaturePlaced) return alert('Signature already placed');

    const initialsAuto = name.trim().split(' ').map(word => word[0]).join('').toUpperCase();
    const newSig = { name, initials: initialsAuto, font, fontSize };
   // console.log('🔥 Setting signature to:', newSig);
    setSignature(newSig);
    setIsSignaturePlaced(true);
    //setInitials(initialsAuto);
    
    //setSignature({ name, initials: initialsAuto, font });
    

  };
 /* useEffect(() => {
  if (signature) {
    console.log('🔥 Signature state updated:', signature);
  }
}, [signature]); */


 /* const handleStopDrag = async (e, data) => {
    try {
      //const payload = { documentId: id, x: data.x, y: data.y, page: currentPage ,name: signature.name,font: signature.font};
      //await postSignature(payload);
      console.log('🧾 Sending to API:', import.meta.env.VITE_API_BASE_URL);

      await postSignature({
            documentId: id,
            x: data.x,
            y: data.y,
            page: currentPage,
            name: signature.name,
            font: signature.font
            });


      // 🛠️ Add a delay here before calling apply API
    await new Promise(resolve => setTimeout(resolve, 200));      
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/signatures/apply/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const signedData = await res.json();
      const signedUrl = `http://localhost:5000${signedData.url}`;
setFileUrl(signedUrl);           // ✅ will re-render the Document with signed PDF
setSignedFileName(signedData.fileName);
setShowToolbar(true);            // ✅ show download/share buttons
      /*setFileUrl(`http://localhost:5000${signedData.url}`);
      setSignedFileName(signedData.fileName);
      setShowToolbar(true);*/
/*    } catch (err) {
      alert('Error saving or signing the PDF');
      console.error(err);
    }
  };
*/

/*const [sigX, setSigX] = useState(100);
const [sigY, setSigY] = useState(200); */


 /*   const handleStopDrag = async (e, data) => {
  try {
    if (!signature) return;

    const pdfContainer = document.querySelector('.react-pdf__Page');
    const rect = pdfContainer.getBoundingClientRect();
 /*  setSigX(data.x);
  setSigY(data.y);
 */
     /*const relativeX = data.x;
    const relativeY = data.y; 

     //console.log('📐 Dragged coords:', { x: relativeX, y: relativeY });

 /*   const scaleX = pageWidth / rect.width;
    const scaleY = pageWidth / rect.width;  // assuming uniform scaling for X and Y

const relativeX = data.x * scaleX;
const relativeY = data.y * scaleX;

console.log('✅ relativeX:', relativeX, 'relativeY:', relativeY);

setPlacedCoords({ x: data.x, y: data.y });
    await postSignature({
      documentId: id,
      x: relativeX,
      y: relativeY,
      page: currentPage,
      name: signature.name,
      font: signature.font
    });

    //console.log('✅ postSignature done');

   // console.log('📥 Fetching signed PDF...');

    const token = localStorage.getItem('token');
    //console.log('✅ API URL:', `${import.meta.env.VITE_API_BASE_URL}/signatures/apply/${id}`);

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signatures/apply/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    //console.log('✅ Fetch done:', res);

    const signedData = await res.json();

   // console.log('✅ signedData from backend:', signedData);

    const signedUrl = `http://localhost:5000${signedData.url}`;

    //console.log('✅ signedUrl constructed:', signedUrl);


   // console.log('signedData', signedData);
    //const signedUrl = `${import.meta.env.VITE_API_BASE_URL}${signedData.url}`;

    //console.log('📄 New signed URL:', signedUrl);
    setFileUrl(signedUrl);
    setSignedFileName(signedData.fileName);

    //console.log('Setting showToolbar true');
    setShowToolbar(true);
    //setSignature(null);
//setIsSignaturePlaced(false);
    
   // console.log('✅ Signed PDF fetched and toolbar shown');
    //console.log('✅ handleStopDrag complete');
  } catch (err) {
    console.error('❌ Error applying signature:', err);
    alert('Failed to apply signature');
  }
};
*/
/*
const handleStopDrag = (e, data) => {
  const pdfContainer = document.querySelector('.react-pdf__Page');
  const rect = pdfContainer.getBoundingClientRect();
  //
  const pageHeight = pdfContainer.offsetHeight; // Actual rendered height in px
  const pageWidth = pdfContainer.offsetWidth;   // Use this if not defined elsewhere
  const scaleX = pageWidth / rect.width;
  //const relativeX = data.x * scaleX;
  //const relativeY = data.y * scaleX;
  //const scaleY = pageHeight /rect.height;
const scaleY = 595 / pageHeight;
  
  const relativeX = (data.x - rect.left) ;

  const relativeY = (data.y - rect.top) * scaleY;
const pdfY = 595 - relativeY - 24; // shift for font size

console.log('📐 Transformed coordinates:', {
    x: relativeX,
    y: pdfY,
    scaleX,
    scaleY,
    pageHeight,
    rawX: data.x,
    rawY: data.y
  });


  setPlacedCoords({ x: relativeX, y: pdfY });
};
*/
/*
const handleStopDrag = (e, data) => {
  const pdfPageElement = document.querySelector('.react-pdf__Page');
  const rect = pdfPageElement.getBoundingClientRect();

  const renderedHeight = rect.height;
  const renderedWidth = rect.width;

  const pdfHeight = 595; // A4 standard height
  const pdfWidth = 842;

  const scaleX = pdfWidth / renderedWidth;
  const scaleY = pdfHeight / renderedHeight;

  const relativeX = (data.x - rect.left) * scaleX;
  const relativeY = (data.y - rect.top) * scaleY;

  const finalX = Math.max(0, Math.min(pdfWidth - 50, relativeX));
  const finalY = Math.max(0, Math.min(pdfHeight, pdfHeight - relativeY -24)); // Clamp Y inside page

  console.log('📐 Transformed for PDF:', {
    x: finalX,
    y: finalY,
    scaleX,
    scaleY,
    renderedHeight,
    pdfHeight,
  });

  setPlacedCoords({ x: finalX, y: finalY });
};













const handleConfirmSignature = async () => {
    try {
      if (!placedCoords || !signature) return;
      await postSignature({ documentId: id, x: placedCoords.x, y: placedCoords.y, page: currentPage, name: signature.name, font: signature.font });
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/signatures/apply/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const signedData = await res.json();
      setFileUrl(`http://localhost:5000${signedData.url}`);
      setSignedFileName(signedData.fileName);
      setShowToolbar(true);
    } catch (err) {
      alert('Error applying signature');
    }
  }; 

*/
/*
const handleStopDrag = async (e, data) => {
  const pdfElement = document.querySelector('.react-pdf__Page');
  const rect = pdfElement.getBoundingClientRect();

  // Use actual rendered dimensions
  const renderedWidth = rect.width;
  const renderedHeight = rect.height;

  // Get page dimensions from PDF metadata
  const page = document.querySelector('canvas'); // PDF rendered canvas
  const pdfWidth = page?.width || 595;  // fallback to A4
  const pdfHeight = page?.height || 842;

  const scaleX = pdfWidth / renderedWidth;
  const scaleY = pdfHeight / renderedHeight;

  const relativeX = (data.x - rect.left) * scaleX;
  const relativeY = (data.y - rect.top) * scaleY;

  // Flip Y coordinate to match PDF origin (bottom-left)
 // const finalY = pdfHeight - relativeY - 24;
 const finalX = Math.max(0, Math.min(pdfWidth - 50, relativeX));
  const finalY = Math.max(0, Math.min(pdfHeight -36  , pdfHeight - relativeY - 36)); // ✅ Clamp to page

  const coords = {
    x: Math.round(finalX),
    y: Math.round(finalY),
  };

  console.log('📐 Final transformed coords for PDF:', coords);
  setPlacedCoords(coords);
};   */

const handleStopDrag = (e, data) => {
  const canvas = document.querySelector('.react-pdf__Page canvas');
  const canvasRect = canvas.getBoundingClientRect();

  const renderedWidth = canvasRect.width;
  const renderedHeight = canvasRect.height;

 // const pdfWidth = 842;  // A4 standard width
  //const pdfHeight = 595; // A4 standard height

  const scaleX = pdfDims.width / renderedWidth;
  const scaleY = pdfDims.height / renderedHeight;

  // 🌐 Support both mouse and touch devices
  const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

  // ✨ Subtract canvas left/top to make (0,0) top-left of PDF
  const relativeX = (clientX - canvasRect.left) * scaleX;
  const relativeY = (clientY - canvasRect.top) * scaleY;

  // 🔁 Convert to PDF-lib coordinates (bottom-left origin)
  const finalX = Math.max(0, Math.min(pdfDims.width - 50, relativeX));
  const finalY = Math.max(0, Math.min(pdfDims.height - 36, pdfDims.height - relativeY));

  console.log('📐 Final transformed coords for PDF:', {
    x: finalX,
    y: finalY,
    scaleX,
    scaleY,
    canvasWidth: renderedWidth,
    canvasHeight: renderedHeight,
  });

  setPlacedCoords({ x: finalX, y: finalY });
  console.log('📍 Dragging stopped:', { finalX, finalY });
  alert(`📍 Drag complete at: ${Math.round(finalX)}, ${Math.round(finalY)}`);
};











const handleConfirmSignature = async () => {
 if (!placedCoords || placedCoords.x == null || placedCoords.y == null) {
    alert('❌ Please drag and place your signature before confirming.');
    return;
  }
 
    try {
    

console.log('📤 Sending postSignature payload:', {
  documentId: id,
  x: placedCoords.x,
  y: placedCoords.y,
  page: currentPage,
  name: signature?.name,
  font: signature?.font,
  fontSize: signature?.fontSize,
});



    await postSignature({
      documentId: id,
      x: placedCoords.x,
      y: placedCoords.y,
      page: currentPage,
      name: signature.name,
      font: signature.font,
      fontSize:signature.fontSize  ?? 24,
    });

    const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signatures/apply/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});
const signedData = await res.json();
const backendBase = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
setFileUrl(`${backendBase}${signedData.url}`);

    setSignedFileName(signedData.fileName);
    setShowToolbar(true);
    setSignature(null);
setIsSignaturePlaced(false);

  } catch (err) {
    console.error('❌ Error applying signature:', err);
    alert('Failed to apply signature');
  }
};

















































/*
const handleConfirmSignature = async () => {
  if (!placedCoords || !signature) return;

  const payload = {
    x: placedCoords.x,
    y: placedCoords.y,
    page: currentPage,
    name: signature.name,
    font: signature.font,
  };

  const token = localStorage.getItem('token');
  await fetch(`${import.meta.env.VITE_API_BASE_URL}/signatures/apply/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    
  });
};*/









  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = signedFileName || 'signed-document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  /*const handleDownload = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('Failed to download PDF');

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = signedFileName || 'signed-document.pdf';
    link.click();

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('❌ Download error:', err);
    alert('Failed to download signed PDF');
  }
};
*/

  const handleShare = (type) => {
    const shareUrl = fileUrl;
    const encoded = encodeURIComponent(shareUrl);
    if (type === 'gmail') {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Signed Document&body=${encoded}`, '_blank');
    } else if (type === 'whatsapp') {
      window.open(`https://wa.me/?text=Here is the signed PDF: ${encoded}`, '_blank');
    } else if (type === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encoded}`, '_blank');
    } else if (type === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encoded}&text=Signed PDF`, '_blank');
    } else if (type === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative border bg-gray-100 p-2 w-full">
        <Document
          file={fileUrl}
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={(e) => console.error('PDF load error:', e)}
        >
          <Page pageNumber={currentPage} width={window.innerWidth < 768 ? window.innerWidth - 40 : 600} />
        </Document>

        <div className="mt-4 flex gap-4 items-center justify-center">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
          >
            ⬅ Prev
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {numPages || '?'}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, numPages))}
            disabled={currentPage === numPages}
            className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>

        {signature && (
          <Draggable  bounds="parent"  onStop={handleStopDrag}  >  
            <div
             
              className={`absolute bg-transparent px-0 py-0 cursor-move text-2xl ${signature.font.replace(/ /g, '-').toLowerCase()}`}
              style={{  pointerEvents: 'auto' }}
            >
              {signature.name}
            </div>
          </Draggable>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Signature Setup</h2>
        <label className="block mb-2 font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Your name"
        />
        <label className="block mb-2 font-medium">Choose Font</label>
        <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full border p-2 rounded mb-4">
          {fonts.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
<label className="block mb-2 font-medium">Font Size</label>
<input
  type="number"
  value={fontSize}
  onChange={(e) => setFontSize(Number(e.target.value))}
  className="w-full border p-2 rounded mb-4"
  min={8}
  max={100}
/>


        <div className="mb-4">
          <label className="block mb-1 font-medium">Preview:</label>
          <div className={`text-2xl p-2 border rounded shadow ${font.replace(/ /g, '-').toLowerCase()}`}>{name || 'Your Signature'}</div>
        </div>
        <button
          onClick={handlePlaceSignature}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Place Signature
        </button>
           <div>
      
     
        <button onClick={handleConfirmSignature} className=" w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded">Confirm Signature</button>
      
    </div>


        {showToolbar && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={handleDownload} className=" w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Download Signed PDF
            </button>
            <button onClick={() => handleShare('gmail')} className=" w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Share via Gmail
            </button>
            <button onClick={() => handleShare('whatsapp')} className=" w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Share via WhatsApp
            </button>
            <button onClick={() => handleShare('facebook')} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Facebook
            </button>
            <button onClick={() => handleShare('twitter')} className="w-full bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">
              Twitter / X
            </button>
            <button onClick={() => handleShare('copy')} className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}





















/* import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import Draggable from 'react-draggable';
import { postSignature } from '../utils/api';
//import './SignatureFonts.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const fonts = ['Pacifico', 'Roboto', 'Courier New'];

export default function SignaturePage() {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState('');
  const [pageWidth] = useState(600);
  const [signature, setSignature] = useState(null);
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [font, setFont] = useState(fonts[0]);
  const [showToolbar, setShowToolbar] = useState(false);

  const dragRef = useRef(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/docs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const cleanPath = data.filePath.replace(/\\/g, '/');
        const fullUrl = `http://localhost:5000${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
        setFileUrl(fullUrl);
      } catch (err) {
        console.error('Failed to fetch PDF:', err);
      }
    };
    fetchDocument();
  }, [id]);

  const handlePlaceSignature = () => {
    if (!name.trim()) return alert('Please enter your full name');
    const initialsAuto = name.trim().split(' ').map(word => word[0]).join('').toUpperCase();
    setInitials(initialsAuto);
    setSignature({ name, initials: initialsAuto, font });
  };

  const handleStopDrag = async (e, data) => {
    try {
      const payload = {
        documentId: id,
        x: data.x,
        y: data.y,
        page: 1
      };
      await postSignature(payload);
      setShowToolbar(true);
    } catch (err) {
      alert('Error saving signature');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sign Your PDF</h2>

      {/* Step 1: Signature Setup */
    /*  {!signature && (
        <div className="border p-4 rounded shadow max-w-md mb-6">
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Your full name"
          />

          <label className="block mb-2">Choose Font</label>
          <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full border p-2 rounded mb-4">
            {fonts.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <div className="mb-4">
            <label className="block mb-1">Preview:</label>
            <div className={`text-xl p-2 border rounded ${font.toLowerCase()}`}>{name || 'Your Signature'}</div>
          </div>

          <button
            onClick={handlePlaceSignature}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Place Signature
          </button>
        </div>
      )}

      {/* Step 2: Show PDF 
      <div className="relative border inline-block" style={{ width: pageWidth }}>
        <Document file={fileUrl} onLoadError={(e) => console.error('PDF load error:', e)}>
          <Page pageNumber={1} width={pageWidth} />
        </Document>

        {/* Step 3: Signature Placement *
        {signature && (
          <Draggable
            nodeRef={dragRef}
            bounds="parent"
            onStop={handleStopDrag}
          >
            <div
              ref={dragRef}
              className={`absolute bg-transparent text-black px-2 py-1 rounded cursor-move text-lg font-medium ${signature.font.toLowerCase()}`}
              style={{ top: 200, left: 100 }}
            >
              {signature.name}
            </div>
          </Draggable>
        )}
      </div>

      {/* Step 4: Post-sign Toolbar 
      {showToolbar && (
        <div className="mt-6 flex gap-4 items-center">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Download Signed PDF
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Share via Gmail
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
            Share via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}






*/





// src/pages/SignaturePage.jsx
/*import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { postSignature } from '../utils/api';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function SignaturePage() {
  const { id } = useParams(); // documentId from route
  const [fileUrl, setFileUrl] = useState('');
  const [signatures, setSignatures] = useState([]);
  const [pageWidth, setPageWidth] = useState(600); // Adjust as needed

  /* useEffect(() => {
    // Set the PDF file URL
    setFileUrl(`http://localhost:5000/uploads/${id}.pdf`);
  }, [id]); */

/* useEffect(() => {
  const fetchDocument = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/docs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFileUrl(`http://localhost:5000${data.filePath}`); // ✅ Use actual path
    } catch (err) {
      console.error('Failed to fetch document info', err);
    }
  };

  fetchDocument();
}, [id]);  */

 // ✅ Fetch the actual document filePath using document ID
 /* useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('📦 Fetching document with ID:', id);
        const res = await fetch(`http://localhost:5000/api/docs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // if (!res.ok) throw new Error('Could not fetch document');

        if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ Failed to fetch document:', errorText);
        return;
      }

        const data = await res.json();
        console.log('✅ Document data:', data);

      const cleanPath = data.filePath.replace(/\\/g, '/'); // convert \ to /
const fullUrl = `http://localhost:5000${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
console.log('📄 Clean PDF path:', fullUrl);
setFileUrl(fullUrl);


      /* const path = `http://localhost:5000${data.filePath}`;
      console.log('📄 Full PDF path:', path);

        // ✅ Use actual filePath returned from backend
        setFileUrl(path); */
   /*   } catch (err) {
        console.error('Failed to fetch document info:', err);
      }
    };

    fetchDocument();
  }, [id]);


  const handlePdfClick = async (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const newSignature = await postSignature({
        documentId: id,
        x,
        y,
        page: 1,
      });
      setSignatures(prev => [...prev, newSignature]);
    } catch (error) {
      alert('Error saving signature.');
      console.log('📌 Sending signature:', { documentId: id, x, y, page: 1 });

      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Click anywhere on the PDF to place your signature</h2>

      <div
        className="relative border border-gray-400 inline-block"
        style={{ width: pageWidth }}
        onClick={handlePdfClick}
      >
        <Document file={fileUrl}
        onLoadError={(error) => console.error('PDF load error:', error)}>
          <Page pageNumber={1} width={pageWidth} />
        </Document>

        {/* Signature overlays */
 /*       {signatures.map((sig, index) => (
          <div
            key={index}
            className="absolute bg-yellow-400 text-xs px-2 py-1 rounded shadow"
            style={{
              top: sig.y,
              left: sig.x,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
            }}
          >
            Sign Here
          </div>
        ))}
      </div>
    </div>
  );
}
*/