import { Button, TextField } from "@mui/material";

type Props = {
  onNewToDoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
  newTodo: string;
};

export const CreateNewToDo = ({ onNewToDoChange, addTodo, newTodo }: Props) => {
  return (
    <div>
      <TextField size="small" value={newTodo} onChange={onNewToDoChange} />
      <Button variant="contained" onClick={addTodo}>
        Thêm
      </Button>
    </div>
  );
};
