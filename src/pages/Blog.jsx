import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Blog</h1>
      <div className="space-y-3">
        {posts.map(p => (
          <Link
            key={p.id}
            to={`/blog/${p.id}`}
            className="block p-4 bg-white shadow rounded"
          >
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.excerpt}</p>
          </Link>
        ))}
        {posts.length === 0 && <p>No posts yet.</p>}
      </div>
    </div>
  );
}
