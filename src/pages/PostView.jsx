import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function load() {
      const d = await getDoc(doc(db, "posts", id));
      setPost(d.exists() ? d.data() : null);
    }
    load();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <article className="prose lg:prose-xl">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(
          post.createdAt?.seconds
            ? post.createdAt.seconds * 1000
            : Date.now()
        ).toLocaleString()}
      </p>
      <div>{post.content}</div>
    </article>
  );
}
www
