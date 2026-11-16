
import { useState, type FormEvent, type ChangeEvent } from "react";

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle);
    setTitle("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
        aria-label="New todo task"
      />

      <button type="submit" disabled={!title.trim()}>
        + Add Task
      </button>
    </form>
  );
}

export default TodoForm;
