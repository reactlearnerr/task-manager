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

  useEffect(() => {
    const mockFlag = JSON.parse(localStorage.getItem("mock"));
    console.log(mockFlag);
    if (mockFlag) {
      console.log("get todos from typicode server", mockFlag);
      dispatch(getTodos());
    } else {
      console.log("get todos from sb application", mockFlag);
      dispatch(getSBTodos());
    }
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
        {isLoading && error === "" ? (
          <div className="loading">Loading Todos...</div>
        ) : (
          todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        )}
        {!isLoading && error !== "" && <div className="error">{error}</div>}
      </Box>
    </>
  );
};

export default Todos;
