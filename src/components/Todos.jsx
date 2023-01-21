import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/actions/TodoActions";
import { getSBTodos } from "../redux/sbactions/SBTodoActions";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const Todos = () => {
  const { todos, isLoading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const mockFlag = useSelector((state) => state.common.mock);

  useEffect(() => {
    mockFlag ? dispatch(getTodos()) : dispatch(getSBTodos());
  }, []);

  return (
    <>
      <Box m={4} textAlign="center">
        <Typography
          sx={{ textDecoration: "underline 3px crimson" }}
          variant="h4"
        >
          Today's Items to do
        </Typography>
      </Box>
      <Divider />
      <TodoForm />
      <Box p={2} className="todos">
        {isLoading ? (
          <div className="loading">Loading Todos...</div>
        ) : (
          todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        )}
        {error && <div className="error">{error}</div>}
      </Box>
    </>
  );
};

export default Todos;
