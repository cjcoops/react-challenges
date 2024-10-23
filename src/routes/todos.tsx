import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/todos")({
  component: TodosComponent,
});

type Todo = {
  text: string;
  isComplete: boolean;
  id: number;
};

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localStorageTodos = localStorage.getItem("myTodos");
    if (localStorageTodos) {
      return JSON.parse(localStorageTodos);
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { text: newTodo.trim(), isComplete: false, id: Date.now() },
      ]);
      setNewTodo("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const toggleIsComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  return {
    newTodo,
    setNewTodo,
    handleKeyDown,
    handleAddTodo,
    todos,
    toggleIsComplete,
  };
}

function TodosComponent() {
  const {
    newTodo,
    setNewTodo,
    handleKeyDown,
    handleAddTodo,
    todos,
    toggleIsComplete,
  } = useTodos();

  return (
    <div className="p-2">
      <div className="flex gap-2">
        <input
          className="input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Enter a new todo"
        />
        <button className="btn" onClick={() => handleAddTodo()}>
          Submit
        </button>
      </div>
      <h3>Todos:</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex gap-2">
            <span className={todo.isComplete ? "line-through" : ""}>
              {todo.text}
            </span>
            <button
              className="btn"
              onClick={() => handleAddTodo()}
              onClickCapture={() => toggleIsComplete(todo.id)}
            >
              {todo.isComplete ? "Undo" : "Complete"}
            </button>
            <button className="btn">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
