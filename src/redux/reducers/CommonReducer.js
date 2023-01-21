import { TOGGLE_MOCK_FLAG } from "../actiontypes/CommonActionTypes";

const initialState = { mock: true };

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOCK_FLAG: {
      console.log(action);
      return { ...state, mock: !state.mock };
    }
    default:
      return state;
  }
};
export default CommonReducer;
