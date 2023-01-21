import { Box, Input, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { FaTrash, FaSave, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeTodo, updateTodo } from "../redux/actions/TodoActions";
import { updateSBTodo } from "../redux/sbactions/SBTodoActions";
const Todo = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const dispatch = useDispatch();
  const { backend } = useParams();
  console.log(backend);
  const removeTodoById = () => {};

  const editTodo = () => {
    backend === "mock"
      ? dispatch(updateTodo(todo.id, editingText))
      : dispatch(updateSBTodo(todo.id, editingText));
    setIsEditing(false);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        className="todo-container"
      >
        <div className="title">
          {isEditing ? (
            <Input
              type="text"
              value={editingText}
              placeholder={todo.title}
              onChange={(e) => setEditingText(e.target.value)}
            />
          ) : (
            <Typography variant="h6">{todo.title}</Typography>
          )}
        </div>
        <div onClick={() => dispatch(removeTodo(todo.id))} className="delete">
          {<FaTrash />}
        </div>
        {isEditing ? (
          <div onClick={editTodo} className="save">
            {<FaSave />}
          </div>
        ) : (
          <div onClick={() => setIsEditing(!isEditing)} className="save">
            {<FaEdit />}
          </div>
        )}
      </Box>
    </>
  );
};

export default Todo;
