import { useMutation } from "@tanstack/react-query";
import { createComment } from "api/comments";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

interface CommentEditorProps {
  postId: string;
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

const CommentEditor = ({ postId, onSubmit, isLoading }: CommentEditorProps) => {
  const [content, setContent] = useState<string>("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.info("Please insert content!");
    }
    // mutation.mutate({ postId, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea ref={contentRef} onChange={handleChange} value={content} />
      <input onChange={(e) => {}} />
      <button>send</button>
    </form>
  );
};

export default CommentEditor;
