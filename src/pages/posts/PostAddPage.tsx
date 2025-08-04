import Container from "components/Container";
import Button from "components/ui/Button/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "./PostAddPage.module.scss";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "api/posts";

const PostAddPage = () => {
  const [content, setContent] = useState<string>("");

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Success!");
      navigate("/posts");
    },
    onError: () => {
      toast.error("Error!");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.warning("Please insert content");
      contentRef.current?.focus();
      return;
    }

    mutation.mutate({ content });
  };

  return (
    <Container>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Content
          <textarea
            ref={contentRef}
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <Button type="submit" style={{ alignSelf: "flex-end" }}>
          {mutation.isPending ? "Submit..." : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default PostAddPage;
