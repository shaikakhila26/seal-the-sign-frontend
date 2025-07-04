# Seal the Sign - Frontend (React + Tailwind + Vite)

A modern, clean, and responsive document signing interface built using **React**, **Vite**, and **Tailwind CSS**. Integrates with the backend for file uploads, PDF viewing, drag-and-drop signature placement with font styling.

---

## 📁 Folder Structure

seal-the-sign-frontend/

1. src/
2.  pages/            # SignaturePage.jsx, Dashboard.jsx, Login.jsx etc
3.  components/       # UploadForm, DocumentList, etc
4. utils/            # Axios config (api.js)
5. App.jsx
6.  main.jsx
7.  public/
8.  .env                 # VITE_API_BASE_URL

## ✨ Features

- Login / Register (JWT based)
- Upload PDF with preview (react-pdf)
- View and manage uploaded documents
- Signature placement by dragging
- Signature styling: name, font, size
- Font picker with 20+ Google Fonts
- Share signed PDF ( WhatsApp, etc)
- Responsive layout (mobile + desktop)

---

## 🧠 Pages

- `/login` → Login / Register UI
- `/dashboard` → Upload + Document List
- `SignaturePage.jsx` → Signature drag UI

## 🧪 Components

- `UploadForm.jsx` → Upload PDF
- `DocumentList.jsx` → List and open PDFs

---

---

## 🛠 Libraries Used

- React (Vite)
- Tailwind CSS
- Axios
- React-PDF
- React-Draggable
- Google Fonts

---

## ⚠ Known Issues & Fixes

-  Mobile signature position mismatch fixed using accurate canvas scaling
-  Upload path bug resolved by cleaning file path `\` to `/`
-  Signature save bug on mobile fixed by handling `clientX/clientY` properly

---

---

## 🚀 Deployment

- Backend: [Render](https://render.com)
- Frontend: [Vercel](https://vercel.com)

---

## 👩‍💻 Author

 Akhila Shaik
Computer Science | MERN Stack Developer | Passionate about clean though messy UIs
