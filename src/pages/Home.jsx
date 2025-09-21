import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function load() {
      const pq = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(3));
      const bq = query(collection(db, "books"), orderBy("createdAt", "desc"), limit(4));

      const psnap = await getDocs(pq);
      const bsnap = await getDocs(bq);

      setPosts(psnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setBooks(bsnap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest posts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {posts.length === 0 && <div>No posts yet.</div>}
          {posts.map(p => (
            <Link
              key={p.id}
              to={`/blog/${p.id}`}
              className="p-4 bg-white shadow rounded hover:shadow-md"
            >
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent books</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {books.length === 0 && <div>No books yet.</div>}
          {books.map(b => (
            <a
              key={b.id}
              href={b.url}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-white shadow rounded hover:shadow-md"
            >
              <h3 className="font-medium">{b.title}</h3>
              <p className="text-xs text-gray-600">{b.filename}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
