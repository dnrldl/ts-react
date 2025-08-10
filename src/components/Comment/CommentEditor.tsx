import Button from "components/ui/Button/Button";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";
import styles from "./CommentEditor.module.scss";

interface CommentEditorProps {
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

const CommentEditor = ({ onSubmit, isLoading }: CommentEditorProps) => {
  const [content, setContent] = useState<string>("");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.warning("Require Login!");
      return;
    }

    if (!content.trim()) {
      toast.warning("Enter comment!");
      contentRef.current?.focus();
      return;
    }
    onSubmit(content);
    setContent("");
  };

  const handleFocus = () => {
    if (!isLoggedIn) {
      toast.warning("Require Login!");
      contentRef.current?.blur();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editorForm}>
      <textarea
        ref={contentRef}
        onChange={handleChange}
        onFocus={handleFocus}
        value={content}
        disabled={isLoading}
        className={styles.textarea}
        placeholder="Enter comment..."
        readOnly={!isLoggedIn}
        rows={3}
      />
      <div className={styles.buttonWrapper}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default CommentEditor;
