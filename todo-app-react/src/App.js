import TodoList from "./components/TodoList";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodos(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const AddToDo = useCallback(() => {
    setTodos([{ id: v4(), name: newTodo, isCompleted: false }, ...todos]);
    setNewTodo("");
  }, [newTodo, todos]);

  const onCheckBtnClick = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    <>
      <h3>To Do List</h3>
      <TextField
        name="add-todo"
        placeholder="Write your to do..."
        elemAfterInput={
          <Button
            isDisabled={newTodo === "" ? true : false}
            appearance="primary"
            onClick={AddToDo}
          >
            Add
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      ></TextField>
      <TodoList todos={todos} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
