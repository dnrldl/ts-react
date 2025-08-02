// src/pages/posts/add/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "components/Container";
import styles from "./PostAddPage.module.scss";
import Button from "components/ui/Button";
import axiosInstance from "api/axiosInstance";

const PostAddPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axiosInstance.post("/posts", { title, body });
      console.log(res.data);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      alert("게시글 작성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Title
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Content
          <textarea
            className={styles.textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>

        <Button type="submit" style={{ alignSelf: "flex-end" }}>
          {loading ? "Submit..." : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default PostAddPage;
