import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import PostView from "./pages/PostView";
import Books from "./pages/Books";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<PostView />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="bg-white border-t py-4 text-center">
        © {new Date().getFullYear()} Sciency
      </footer>
    </div>
  );
}
