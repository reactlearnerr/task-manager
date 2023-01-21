import { Box, Input, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { FaTrash, FaSave, FaEdit } from "react-icons/fa";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  completeTodo,
  removeTodo,
  updateTodo,
} from "../redux/actions/TodoActions";
import {
  completeSBTodo,
  removeSBTodo,
  updateSBTodo,
} from "../redux/sbactions/SBTodoActions";
const Todo = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const dispatch = useDispatch();
  const { backend } = useParams();

  const removeTodoById = () => {
    backend === "mock"
      ? dispatch(removeTodo(todo.id))
      : dispatch(removeSBTodo(todo.id));
  };

  const editTodo = () => {
    backend === "mock"
      ? dispatch(updateTodo(todo.id, editingText))
      : dispatch(updateSBTodo(todo.id, editingText));
    setIsEditing(false);
  };

  const markTodoCompleted = (todoId, completed) => {
    backend === "mock"
      ? dispatch(completeTodo(todoId, completed))
      : dispatch(completeSBTodo(todoId, completed));
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
        <div onClick={removeTodoById} className="delete">
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
        <div
          onClick={() => markTodoCompleted(todo.id, !todo.completed)}
          className="delete"
        >
          {todo.completed ? <GrCheckboxSelected /> : <GrCheckbox />}
        </div>
      </Box>
    </>
  );
};

export default Todo;
