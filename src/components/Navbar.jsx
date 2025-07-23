import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-900">
          CryptoInvest
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-500">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-500">About</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-green-500">Dashboard</Link>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col space-y-4 mt-4 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-green-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-500" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-green-500" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        </div>
      )}
    </nav>
  );
}
