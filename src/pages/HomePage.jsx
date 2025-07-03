

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 text-white relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-purple-900/60 backdrop-blur-sm shadow-md">
        <div className="text-2xl font-bold tracking-wider text-yellow-400">
          🖋️ Seal the Sign
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          <Link to="/register" className="hover:text-yellow-300 transition">Register</Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        {/* Text block */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-300 drop-shadow">
            Digitally Sign PDFs With Ease ✍️
          </h1>
          <p className="text-lg text-purple-100">
            Seal the Sign lets you upload, sign, and securely share PDFs. Customize your signature with fonts, drag placement, and more.
          </p>
        </div>

        {/* Abstract layered blob + Logo in yellow circle */}
        <div className="relative mt-10 md:mt-0 w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
          {/* Back blobs */}
          <div className="absolute inset-0 rounded-full bg-purple-600 rotate-45 scale-110 z-10"></div>
          <div className="absolute inset-6 rounded-full bg-pink-500 rotate-12 scale-95 z-20"></div>
          {/* Yellow circle with logo */}
          <div className="absolute inset-12 rounded-full bg-yellow-400 rotate-[30deg] scale-75 z-30 flex items-center justify-center p-4 shadow-md">
            <img
              src="/logo.jpg"
              alt="Seal the Sign Logo"
              className=" w-24 h-24 rounded-full object-cover"
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;





















/*
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 text-white relative">
      {/* Navbar 
      <nav className="flex justify-between items-center px-6 py-4 bg-purple-900/60 backdrop-blur-sm shadow-md">
        <div className="text-2xl font-bold tracking-wider text-yellow-400">
          🖋️ Seal the Sign
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          <Link to="/register" className="hover:text-yellow-300 transition">Register</Link>
        </div>
      </nav>

      {/* Main Section 
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        {/* Text block 
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-300 drop-shadow">
            Digitally Sign PDFs With Ease ✍️
          </h1>
          <p className="text-lg mb-6 text-purple-100">
            Seal the Sign lets you upload, sign, and securely share PDFs. Customize your signature with fonts, drag placement, and more.
          </p>
          <Link
            to="/dashboard"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Get Started
          </Link>
        </div>

        {/* Abstract layered blob (fake illustration) 
        <div className="relative mt-10 md:mt-0 w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
          <div className="absolute inset-0 rounded-full bg-purple-600 rotate-45 scale-110 z-10"></div>
          <div className="absolute inset-6 rounded-full bg-pink-500 rotate-12 scale-95 z-20"></div>
          <div className="absolute inset-12 rounded-full bg-yellow-400 rotate-[30deg] scale-75 z-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;





*/

















/*
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





*/


















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