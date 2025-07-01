// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Seal the Sign</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-md">
        Digitally sign documents with ease. Upload, place your signature, and share securely — all in one place.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
