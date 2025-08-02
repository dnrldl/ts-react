import React, { useState } from "react";
import { Todo } from "types/type";
import styles from "./Editor.module.scss";

interface EditorProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  idRef: React.RefObject<number>;
}

const Editor = ({ setTodos, idRef }: EditorProps) => {
  const [content, setContent] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (content === "") {
      alert("insert");
      return;
    }

    // setTodos((prev) => {
    //   return [
    //     { id: idRef.current++, content, date: getCurrentDateTime() },
    //     ...prev,
    //   ];
    // });

    setContent("");
  };

  return (
    <div className={styles.container}>
      <input
        onKeyDown={onKeyDown}
        type="text"
        value={content}
        onChange={onChange}
      />
      <button onClick={addTodo} style={{ display: "inline" }}>
        Append
      </button>
    </div>
  );
};

export default Editor;
