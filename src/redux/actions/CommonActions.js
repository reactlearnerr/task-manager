import {
  GET_MOCK_FLAG,
  TOGGLE_MOCK_FLAG,
} from "../actiontypes/CommonActionTypes";

export const mockFlagAction = () => ({ type: TOGGLE_MOCK_FLAG });
export const getMockFlag = () => ({ type: GET_MOCK_FLAG });
