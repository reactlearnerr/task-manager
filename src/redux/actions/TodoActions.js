import axios from "axios";
import { mock_getAllTodosUrl } from "../../apis";
import {
  ADD_TODO,
  ADD_TODOS,
  DELETE_TODO,
  LOADING_TODO,
  TOGGLE_COMPLETE,
  SHOW_ERROR,
  UPDATE_TODO,
  CLEAR_TODOS,
} from "../actiontypes/TodoActionsTypes";

export const loadingTodos = () => ({ type: LOADING_TODO });

export const fetchAllTodos = (res) => {
  return { type: ADD_TODOS, payload: res };
};

export const showError = (error) => {
  return { type: SHOW_ERROR, payload: error };
};

export const deleteTodo = (todoId) => ({ type: DELETE_TODO, payload: todoId });

export const removeTodo = (todoId) => {
  return (dispatch) => dispatch(deleteTodo(todoId));
};

export const markTodoComplete = (todoId, completed) => ({
  type: TOGGLE_COMPLETE,
  payload: { todoId, completed },
});

export const updateTodoRequest = (todoId, editingText) => ({
  type: UPDATE_TODO,
  payload: { todoId, editingText },
});

export const updateTodo = (todoId, editingText) => {
  return (dispatch) => {
    dispatch(loadingTodos());
    dispatch(updateTodoRequest(todoId, editingText));
  };
};

export const completeTodo = (todoId, completed) => {
  return (dispatch) => {
    dispatch(loadingTodos());
    dispatch(markTodoComplete(todoId, completed));
  };
};

export const addTodo = (title) => {
  const todo = {
    createdAt: new Date(),
    id: new Date().getTime(),
    completed: false,
    title: title,
  };
  return (dispatch) => dispatch({ type: ADD_TODO, payload: todo });
};
export const getTodos = () => {
  return (dispatch) => {
    dispatch(loadingTodos());
    axios
      .get(mock_getAllTodosUrl)
      .then((res) => dispatch(fetchAllTodos(res.data)))
      .catch((error) => dispatch(showError(error.message)));
  };
};

export const resetTodos = () => ({ type: CLEAR_TODOS });
