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

  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = { text: text.trim(), isComplete: false, id: Date.now() };
    setTodos([...todos, newTodo]);
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

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    toggleIsComplete,
    removeTodo,
    addTodo,
  };
}

type TodoFormProps = Pick<ReturnType<typeof useTodos>, "addTodo">;
type TodoListProps = Omit<ReturnType<typeof useTodos>, "addTodo">;

function TodoForm({ addTodo }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}

function TodoList({ todos, removeTodo, toggleIsComplete }: TodoListProps) {
  return (
    <>
      <h3>Todos:</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex gap-2">
            <span className={todo.isComplete ? "line-through" : ""}>
              {todo.text}
            </span>
            <button className="btn" onClick={() => toggleIsComplete(todo.id)}>
              {todo.isComplete ? "Undo" : "Complete"}
            </button>
            <button className="btn" onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function TodosComponent() {
  const { addTodo, todos, toggleIsComplete, removeTodo } = useTodos();

  return (
    <div className="p-2">
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleIsComplete={toggleIsComplete}
      />
    </div>
  );
}
