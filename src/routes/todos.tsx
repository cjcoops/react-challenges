import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/todos")({
  component: TodosComponent,
});

function TodosComponent() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="p-2">
      <h3>Todos</h3>
      <input />
    </div>
  );
}
