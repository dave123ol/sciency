import { Link } from "react-router-dom";
import logo from "../assets/sciency-logo.png";

export default function Nav() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Sciency" className="w-12 h-12 object-contain" />
          <span className="font-bold text-xl text-indigo-700">Sciency</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/blog" className="text-gray-700 hover:text-indigo-600">Blog</Link>
          <Link to="/books" className="text-gray-700 hover:text-indigo-600">Books</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
          <Link to="/admin" className="text-indigo-600 font-medium">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
