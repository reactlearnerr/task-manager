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
  return (dispatch) => {
    if (getParsedLocalStorageValues("todos") !== null) {
      const filteredTodos = getParsedLocalStorageValues("todos").filter(
        (todo) => todo.id !== todoId
      );
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      dispatch(deleteTodo(todoId));
    } else {
      dispatch(showError("error deleting todo with Id" + todoId));
    }
  };
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
    if (getParsedLocalStorageValues("todos") !== null) {
      const filteredTodos = getParsedLocalStorageValues("todos").filter(
        (todo) => {
          if (todo.id === todoId) {
            todo.title = editingText;
          }
          return todo;
        }
      );
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      dispatch(updateTodoRequest(todoId, editingText));
    } else {
      dispatch(showError("error updating todo with Id" + todoId));
    }
  };
};

export const completeTodo = (todoId, completed) => {
  return (dispatch) => {
    dispatch(loadingTodos());
    if (getParsedLocalStorageValues("todos") !== null) {
      const filteredTodos = getParsedLocalStorageValues("todos").filter(
        (todo) => {
          if (todo.id === todoId) {
            todo.completed = completed;
          }
          return todo;
        }
      );
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      dispatch(markTodoComplete(todoId, completed));
    } else {
      dispatch(showError("error updating todo with Id" + todoId));
    }
  };
};

export const addTodo = (title) => {
  const todo = {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: new Date().getTime(),
    completed: false,
    title: title,
  };
  let todos =
    getParsedLocalStorageValues("todos") != null
      ? getParsedLocalStorageValues("todos")
      : [];
  todos = [...todos, todo];
  localStorage.setItem("todos", JSON.stringify(todos));
  //return (dispatch) => dispatch({ type: ADD_TODO, payload: todo });
  return (dispatch) => dispatch({ type: ADD_TODO, payload: todos });
};

export const getParsedLocalStorageValues = (key) => {
  if (localStorage.getItem(key) === "undefined") {
    return null;
  } else return JSON.parse(localStorage.getItem(key));
};

export const getTodos = () => {
  return (dispatch) => {
    dispatch(loadingTodos());
    if (getParsedLocalStorageValues("todos") !== null) {
      dispatch(fetchAllTodos(getParsedLocalStorageValues("todos")));
    } else {
      dispatch(
        showError("Hooray! No Todos were found. We are done for today.")
      );
    }
  };
};
/*export const getTodos = () => {
  return (dispatch) => {
    dispatch(loadingTodos());
    axios
      .get(mock_getAllTodosUrl)
      .then((res) => dispatch(fetchAllTodos(res.data)))
      .catch((error) => dispatch(showError(error.message)));
  };
};*/

export const resetTodos = () => ({ type: CLEAR_TODOS });
