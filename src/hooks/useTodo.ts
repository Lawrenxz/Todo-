import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useTodoStore from "../zustand/store";

interface UseTodoReturn {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  selectedTodos: string[];
  setSelectedTodos: React.Dispatch<React.SetStateAction<string[]>>;
  handleOnchange: (value: string) => void;
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  handleTodoSelect: (todoID: string) => void;
  markTodo: (todoID: string) => void;
  deleteTodo: (todoID: string) => void;
  bulkMarkTodo: () => void;
  bulkDeleteTodo: () => void;
}

export default function useTodo(): UseTodoReturn {
  const [newTodo, setNewTodo] = useState<string>("");
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const {
    addTodoList,
    deleteTodoAction,
    markCompleteAction,
    markAllCompleteAction,
    deleteAllAction,
  } = useTodoStore();

  function handleOnchange(value: string) {
    setNewTodo(value);
  }

  function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newTodo === "") {
      alert("Please provide a task");
      return;
    }
    addTodoList({ title: newTodo, status: "Pending", id: uuidv4() });
    setNewTodo("");
  }

  function handleTodoSelect(todoID: string) {
    if (selectedTodos.includes(todoID)) {
      setSelectedTodos((prev) => prev.filter((item) => item !== todoID));
    } else {
      setSelectedTodos((prev) => [...prev, todoID]);
    }
  }

  function markTodo(todoID: string) {
    // const updatedTodos = todos.map((todo) =>
    //   todo.id === todoID ? { ...todo, status: "Completed" } : todo
    // );
    // setTodos(updatedTodos);
    markCompleteAction(todoID);
  }

  function deleteTodo(todoID: string) {
    deleteTodoAction(todoID);
  }

  function bulkMarkTodo() {
    markAllCompleteAction(selectedTodos);

    setSelectedTodos([]);
  }

  function bulkDeleteTodo() {
    // const deletedTodos = todos.filter(
    //   (todo) => !selectedTodos.includes(todo.id)
    // );
    deleteAllAction(selectedTodos);

    setSelectedTodos([]);
  }

  return {
    newTodo,
    setNewTodo,
    handleOnchange,
    addTodo,
    selectedTodos,
    setSelectedTodos,
    handleTodoSelect,
    markTodo,
    deleteTodo,
    bulkMarkTodo,
    bulkDeleteTodo,
  };
}
