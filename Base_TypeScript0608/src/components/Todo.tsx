import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const Icon = ({
  isCompleted,
  updateIsCompleted,
  todoId,
}: {
  isCompleted: boolean;
  updateIsCompleted: (todoId: string) => void;
  todoId: string;
}) => {
  return (
    <div onClick={() => updateIsCompleted(todoId)}>
      {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
    </div>
  );
};

export const Todo = ({
  name,
  isCompleted,
  updateIsCompleted,
  todoId,
}: {
  name: string;
  isCompleted: boolean;
  updateIsCompleted: (todoId: string) => void;
  todoId: string;
}) => {
  return (
    <Button
      style={{ justifyContent: "start" }}
      fullWidth={true}
      endIcon={
        <Icon
          todoId={todoId}
          isCompleted={isCompleted}
          updateIsCompleted={updateIsCompleted}
        />
      }
    >
      {name}
    </Button>
  );
};
