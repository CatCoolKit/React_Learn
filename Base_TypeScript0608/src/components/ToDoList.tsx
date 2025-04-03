import { Todo } from "./Todo";
import { Do } from "../App";

export const ToDoList = ({
  todos,
  updateIsCompleted,
}: {
  todos: Do[];
  updateIsCompleted: (todoId: string) => void;
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          name={todo.name}
          isCompleted={todo.completed}
          updateIsCompleted={updateIsCompleted}
          todoId={todo.id}
        />
      ))}
    </div>
  );
};
