import { Box, Container, Grid, Icon, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdSaveAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addSBTodo } from "../redux/sbactions/SBTodoActions";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const { backend } = useParams();
  const dispatch = useDispatch();

  const saveTodo = () => {
    dispatch(addSBTodo(title));
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
