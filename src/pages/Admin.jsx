import { useEffect, useState } from "react";
import { auth, db, storage, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [post, setPost] = useState({ title: "", excerpt: "", content: "" });
  const [bookFile, setBookFile] = useState(null);
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  async function doLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  async function doGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function createPost(e) {
    e.preventDefault();
    if (!post.title) return alert("Add title");
    await addDoc(collection(db, "posts"), {
      ...post,
      createdAt: serverTimestamp(),
    });
    setPost({ title: "", excerpt: "", content: "" });
    alert("Post created");
  }

  async function uploadBook(e) {
    e.preventDefault();
    if (!bookFile) return alert("Select file");
    const storageRef = ref(storage, `books/${Date.now()}_${bookFile.name}`);
    await uploadBytes(storageRef, bookFile);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, "books"), {
      title: bookTitle || bookFile.name,
      filename: bookFile.name,
      url,
      createdAt: serverTimestamp(),
    });
    setBookFile(null);
    setBookTitle("");
    alert("Book uploaded");
  }

  if (!user || user.email !== adminEmail) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-xl mb-4">Admin login</h2>
        <form onSubmit={doLogin} className="space-y-3">
          <input
            required
            placeholder="Email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-3 py-2 rounded">
              Login
            </button>
            <button
              type="button"
              onClick={doGoogle}
              className="bg-gray-200 px-3 py-2 rounded"
            >
              Sign in with Google
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-3">
          Note: create an admin user in Firebase Auth and set VITE_ADMIN_EMAIL
          to that email.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Admin panel</h2>
        <div>
          <span className="mr-3 text-sm">Signed in: {user.email}</span>
          <button
            onClick={logout}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <section className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">Create post</h3>
        <form onSubmit={createPost} className="space-y-2">
          <input
            required
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Short excerpt"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            required
            placeholder="Content (plain text)"
            rows={6}
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Publish
          </button>
        </form>
      </section>

      <section className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">Upload book</h3>
        <form onSubmit={uploadBook} className="space-y-2">
          <input
            placeholder="Book title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            required
            type="file"
            onChange={(e) => setBookFile(e.target.files?.[0] || null)}
            className="w-full"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Upload
          </button>
        </form>
      </section>
    </div>
  );
}
