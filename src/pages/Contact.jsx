import { useState } from "react";
import emailjs from "@emailjs/browser";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Send via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Store a copy in Firestore
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setForm({ name: "", email: "", message: "" });
      setSent(true);
    } catch (err) {
      console.error("Contact error", err);
      alert("There was an error sending your message.");
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-3">Contact us</h2>
      {sent && (
        <div className="p-3 bg-green-50 text-green-800 rounded mb-3">
          Message sent — thank you!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Your idea or opinion"
          className="w-full p-2 border rounded"
        />
        <div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
