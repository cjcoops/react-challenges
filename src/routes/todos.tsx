import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/todos")({
  component: TodosComponent,
});

function TodosComponent() {
  const [todos, setTodos] = useState<string[]>(() => {
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
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="p-2">
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
      <h3>Todos:</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
