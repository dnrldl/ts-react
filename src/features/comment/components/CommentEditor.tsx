import Button from "shared/components/ui/Button/Button";
import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "shared/stores/userStore";
import styles from "./CommentEditor.module.scss";

interface CommentEditorProps {
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

const CommentEditor = ({ onSubmit, isLoading }: CommentEditorProps) => {
  const [content, setContent] = useState<string>("");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn)();

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

  // 현재 값의 줄 수 = 개행 수 + 1
  const rows = useMemo(() => {
    const lines = (content.match(/\n/g)?.length ?? 0) + 1;
    return Math.max(lines, 1);
  }, [content]);

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
        rows={rows}
      />

      <Button type="submit" disabled={isLoading} variant="outline">
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </form>
  );
};

export default CommentEditor;
