
import { useEffect, useMemo, useState } from "react";
import type { Todo, TodoFilter } from "./types";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilterComponent from "./components/TodoFilter";
import TodoStats from "./components/TodoStats";
import "./App.css";

const initialTodos: Todo[] = [
  { id: "1", title: "Complete React homework", completed: false, createdAt: Date.now() },
  { id: "2", title: "Practice useState hook", completed: true, createdAt: Date.now() },
  { id: "3", title: "Learn useEffect hook", completed: false, createdAt: Date.now() },
  { id: "4", title: "Build an interactive Todo App", completed: false, createdAt: Date.now() },
  { id: "5", title: "Practice React components", completed: false, createdAt: Date.now() },
  { id: "6", title: "Understand React props", completed: true, createdAt: Date.now() },
  { id: "7", title: "Learn TypeScript basics", completed: false, createdAt: Date.now() },
  { id: "8", title: "Practice conditional rendering", completed: false, createdAt: Date.now() },
  { id: "9", title: "Learn array methods", completed: true, createdAt: Date.now() },
  { id: "10", title: "Practice JavaScript functions", completed: false, createdAt: Date.now() },
  { id: "11", title: "Create a portfolio website", completed: false, createdAt: Date.now() },
  { id: "12", title: "Improve CSS skills", completed: false, createdAt: Date.now() },
  { id: "13", title: "Learn responsive design", completed: true, createdAt: Date.now() },
  { id: "14", title: "Practice React events", completed: false, createdAt: Date.now() },
  { id: "15", title: "Understand useMemo hook", completed: false, createdAt: Date.now() },
  { id: "16", title: "Practice form handling", completed: false, createdAt: Date.now() },
  { id: "17", title: "Learn localStorage", completed: true, createdAt: Date.now() },
  { id: "18", title: "Build a Quiz Application", completed: false, createdAt: Date.now() },
  { id: "19", title: "Practice Git and GitHub", completed: false, createdAt: Date.now() },
  { id: "20", title: "Learn React Router", completed: false, createdAt: Date.now() },
  { id: "21", title: "Improve project design", completed: true, createdAt: Date.now() },
  { id: "22", title: "Practice debugging", completed: false, createdAt: Date.now() },
  { id: "23", title: "Learn API integration", completed: false, createdAt: Date.now() },
  { id: "24", title: "Complete daily coding practice", completed: false, createdAt: Date.now() },
  { id: "25", title: "Prepare for React assignment", completed: false, createdAt: Date.now() },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("taskflow-todos-v2");

    if (savedTodos) {
      try {
        return JSON.parse(savedTodos) as Todo[];
      } catch {
        return initialTodos;
      }
    }

    return initialTodos;
  });

  const [filter, setFilter] = useState<TodoFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("taskflow-todos-v2", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((previousTodos) => [newTodo, ...previousTodos]);
  };

  const toggleTodo = (id: string) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
  };

  const editTodo = (id: string, newTitle: string) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const clearCompleted = () => {
    const confirmed = window.confirm(
      `Are you sure you want to clear ${completedCount} completed tasks?`
    );

    if (!confirmed) return;

    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.completed)
    );
  };

  const progress =
    todos.length === 0
      ? 0
      : Math.round((completedCount / todos.length) * 100);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, search]);

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <span>TaskFlow</span>
        </div>
        <span className="header-label">MY WORKSPACE</span>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
          <h1>Manage your tasks.</h1>
          <p className="welcome-text">
            Stay organized, focused, and get things done.
          </p>
        </div>

        <div className="date-card">
          <span>📅</span>
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      <TodoStats
        total={todos.length}
        active={activeCount}
        completed={completedCount}
      />

      <section
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "25px",
          border: "1px solid #ebebf2",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Task Completion Progress</strong>
          <strong>{progress}%</strong>
        </div>

        <div
          style={{
            width: "100%",
            height: "12px",
            background: "#eeeef5",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#6958e8",
              borderRadius: "20px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </section>

      <section className="task-section">
        <div className="section-heading">
          <div>
            <h2>My Tasks</h2>
            <p>You have {activeCount} tasks remaining</p>
          </div>
        </div>

        <TodoForm onAddTodo={addTodo} />

        <input
          className="search-input"
          type="search"
          placeholder="🔍 Search your tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <TodoFilterComponent
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{
            all: todos.length,
            active: activeCount,
            completed: completedCount,
          }}
        />

        {completedCount > 0 && (
          <button
            className="clear-completed-btn"
            onClick={clearCompleted}
            type="button"
          >
            Clear Completed ({completedCount})
          </button>
        )}

        <div className="todo-list">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          ) : (
            <div className="empty-state">
              <span>📝</span>
              <h3>No tasks found</h3>
              <p>Add a new task or change your search and filter.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="app-footer">
        <p>Made with React & TypeScript</p>
        <p>TaskFlow © 2026</p>
      </footer>
    </main>
  );
}

export default App;
