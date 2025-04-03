import { ChangeEvent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { CreateNewToDo } from "./components/CreateNewToDo";
import { ToDoList } from "./components/ToDoList";

export interface Do {
  id: string;
  name: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Do[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  }); //type parameter

  const [newTodo, setNewTodo] = useState("");

  const onNewToDoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }
    setTodos([{ id: uuidv4(), name: newTodo, completed: false }, ...todos]);
    setNewTodo("");
  };

  const updateIsCompleted = (todoId: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //store localstore
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   const todos = localStorage.getItem("todos");
  //   if (todos) {
  //     setTodos(JSON.parse(todos));
  //   }
  // }, []);

  return (
    <>
      <p>This is to do react</p>
      <CreateNewToDo
        onNewToDoChange={onNewToDoChange}
        addTodo={addTodo}
        newTodo={newTodo}
      />
      <ToDoList todos={todos} updateIsCompleted={updateIsCompleted} />
    </>
  );
}

export default App;
