

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end px-4"
      style={{ backgroundImage: "url('/home-bg.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Seal the Sign</h1>
        <p className="text-gray-700 mb-6">
          Securely upload, sign, and share PDFs with ease. Your digital document signature solution.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
























/* import { Link } from 'react-router-dom';

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
*/