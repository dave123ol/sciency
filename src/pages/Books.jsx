import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setBooks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Books</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {books.map(b => (
          <div key={b.id} className="bg-white p-4 shadow rounded">
            <h3 className="font-medium">{b.title}</h3>
            <p className="text-xs text-gray-500">{b.filename}</p>
            <div className="mt-3 space-x-2">
              <a
                className="text-indigo-600"
                href={b.url}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
              <a className="text-indigo-600" href={b.url} download>
                Download
              </a>
            </div>
          </div>
        ))}
        {books.length === 0 && <p>No books uploaded yet.</p>}
      </div>
    </div>
  );
}
