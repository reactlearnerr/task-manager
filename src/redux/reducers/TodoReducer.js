import {
  ADD_TODO,
  ADD_TODOS,
  ADD_TODO_ERROR,
  DELETE_TODO,
  GET_TODO,
  LOADING_TODO,
  TOGGLE_COMPLETE,
  SB_UPDATE_TODO,
  SHOW_ERROR,
  UPDATE_TODO,
} from "../actiontypes/TodoActionsTypes";

const initialState = {
  todos: [],
  isLoading: true,
  error: "",
  isEditing: false,
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      console.log(action);
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isLoading: false,
      };
    }
    case LOADING_TODO:
      return { ...state, isLoading: true };
    case ADD_TODOS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
      };
    case GET_TODO:
      return {
        ...state,
        todo: state.todos.filter((todo) => todo.id === action.payload.id),
      };
    case DELETE_TODO: {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }
    case UPDATE_TODO: {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId)
          return { ...todo, title: action.payload.editingText };
        else return todo;
      });
      return { ...state, todos: todos, isLoading: false };
    }
    case SHOW_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ADD_TODO_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case TOGGLE_COMPLETE: {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          console.log({ ...todo, completed: action.payload.completed });
          return { ...todo, completed: action.payload.completed };
        } else return todo;
      });
      return { ...state, todos: todos, isLoading: false };
    }
    default:
      return state;
  }
};

export default TodoReducer;
