import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SignaturePage from './pages/SignaturePage';
import SignFromToken from './pages/SignFromToken';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="h-screen bg-slate-100 text-4xl font-bold flex justify-center items-center text-blue-500">
            ✅ Seal the Sign — Tailwind CSS is Working!
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign/:id" element={<SignaturePage />} />
        <Route path="/sign/:token" element={<SignFromToken />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
