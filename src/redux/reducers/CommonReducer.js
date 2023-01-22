import {
  GET_MOCK_FLAG,
  TOGGLE_MOCK_FLAG,
} from "../actiontypes/CommonActionTypes";

const initialState = { mock: true };

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOCK_FLAG: {
      localStorage.setItem("mock", !state.mock);
      return { ...state, mock: JSON.parse(localStorage.getItem("mock")) };
    }
    case GET_MOCK_FLAG: {
      if (JSON.parse(localStorage.getItem("mock")) != null) {
        return { ...state, mock: JSON.parse(localStorage.getItem("mock")) };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
export default CommonReducer;
