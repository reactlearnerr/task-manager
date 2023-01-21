import axios from "axios";
import {
  getAllTodosUrl,
  addNewTodoUrl,
  deleteTodoUrl,
  updateTodoUrl,
} from "../../apis";
import {
  ADD_TODO,
  ADD_TODOS,
  ADD_TODO_ERROR,
  DELETE_TODO,
  LOADING_TODO,
  SHOW_ERROR,
  UPDATE_TODO,
  TOGGLE_COMPLETE,
} from "../actiontypes/TodoActionsTypes";

export const loadingTodos = () => ({ type: LOADING_TODO });

export const fetchAllTodos = (res) => {
  return { type: ADD_TODOS, payload: res };
};

export const showError = (error) => {
  return { type: SHOW_ERROR, payload: error };
};

export const deleteTodo = (todoId) => ({ type: DELETE_TODO, payload: todoId });

export const updateTodoRequest = (todoId, editingText) => ({
  type: UPDATE_TODO,
  payload: { todoId, editingText },
});

export const addSBTodo = (title) => {
  const todo = {
    createdAt: new Date(),
    id: new Date().getTime(),
    completed: false,
    title: title,
  };
  return (dispatch) => {
    dispatch(loadingTodos());
    axios
      .post(addNewTodoUrl, todo)
      .then((response) => dispatch({ type: ADD_TODO, payload: response }))
      .catch((error) => {
        dispatch({
          type: ADD_TODO_ERROR,
          payload: `${error.message} with error code ${error.code}`,
        });
      });
  };
};
export const getSBTodos = () => {
  return (dispatch) => {
    dispatch(loadingTodos());
    axios
      .get(getAllTodosUrl)
      .then((res) => dispatch(fetchAllTodos(res.data)))
      .catch((error) => dispatch(showError(error.message)));
  };
};
export const removeSBTodo = (todoId) => {
  return (dispatch) => {
    dispatch(loadingTodos());
    axios
      .get(deleteTodoUrl+todoId)
      .then((res) => {
        if (res.status === "SUCCESS") dispatch(deleteTodo(todoId));
      })
      .catch((error) =>
        dispatch(showError(`${error.message} with error code ${error.code}`))
      );
  };
};

export const updateSBTodo = (todoId, editingText) => {
  return (dispatch) => {
    dispatch(loadingTodos());
    axios
      .patch(`${updateTodoUrl}${todoId}`, { title: editingText })
      .then((res) => {
        dispatch(updateTodoRequest(res.id, res.title));
      })
      .catch((error) =>
        dispatch(showError(`${error.message} with error code ${error.code}`))
      );
  };
};

export const markTodoComplete = (todoId, completed) => ({
  type: TOGGLE_COMPLETE,
  payload: { todoId, completed },
});

export const completeSBTodo = (todoId, completed) => {
  return (dispatch) => {
    dispatch(loadingTodos());
    axios
      .patch(`${updateTodoUrl}${todoId}`, { completed: completed })
      .then((res) => {
        dispatch(markTodoComplete(res.id, res.completed));
      })
      .catch((error) =>
        dispatch(showError(`${error.message} with error code ${error.code}`))
      );
  };
};
