import { Box, Input, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { FaTrash, FaSave, FaEdit } from "react-icons/fa";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
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
  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const createdDate = dateFormatter.format(todo.updated);

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const mockFlag = JSON.parse(localStorage.getItem("mock"))
    ? localStorage.getItem("mock")
    : useSelector((state) => state.common.mock);

  const dispatch = useDispatch();

  const removeTodoById = () => {
    mockFlag ? dispatch(removeTodo(todo.id)) : dispatch(removeSBTodo(todo.id));
  };

  const editTodo = () => {
    mockFlag
      ? dispatch(updateTodo(todo.id, editingText))
      : dispatch(updateSBTodo(todo.id, editingText));
    setIsEditing(false);
  };

  const markTodoCompleted = (todoId, completed) => {
    mockFlag
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
          <div className="createdAt">
            <p>Last Modified: {createdDate}</p>
          </div>
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
