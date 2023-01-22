import {
  GET_MOCK_FLAG,
  TOGGLE_MOCK_FLAG,
} from "../actiontypes/CommonActionTypes";
import { resetTodos } from "./TodoActions";

export const mockFlagAction = () => ({ type: TOGGLE_MOCK_FLAG });
export const getMockFlag = () => ({ type: GET_MOCK_FLAG });
export const toggleMockFlag = () => {
  return (dispatch) => {
    dispatch(mockFlagAction());
    dispatch(resetTodos());
  };
};
