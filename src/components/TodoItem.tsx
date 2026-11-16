
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const handleEdit = () => {
    const newTitle = window.prompt("Edit your task:", todo.title);

    if (newTitle === null) return;

    const trimmedTitle = newTitle.trim();

    if (trimmedTitle && trimmedTitle !== todo.title) {
      onEdit(todo.id, trimmedTitle);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span className="todo-title">{todo.title}</span>
      </label>

      <div className="todo-actions">
        <button type="button" onClick={handleEdit}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
