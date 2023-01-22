import { Box, Container, Grid, Icon, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdSaveAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/actions/TodoActions";
import { addSBTodo } from "../redux/sbactions/SBTodoActions";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const mockFlag = JSON.parse(localStorage.getItem("mock"))
    ? localStorage.getItem("mock")
    : useSelector((state) => state.common.mock);
  const saveTodo = () => {
    mockFlag ? dispatch(addTodo(title)) : dispatch(addSBTodo(title));
  };
  return (
    <Box
      border={"1px solid #e5e5e5"}
      p={3}
      m={3}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="outlined-search"
        label="Enter Title"
        type="search"
      />
      <Icon onClick={saveTodo} sx={{ cursor: "pointer" }}>
        <MdSaveAlt />
      </Icon>
    </Box>
  );
};

export default TodoForm;
