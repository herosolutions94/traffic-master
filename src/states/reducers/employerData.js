import {
  FETCH_EMPLOYER_DATA,
  FETCH_EMPLOYER_DATA_SUCCESS,
  FETCH_EMPLOYER_DATA_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYER_DATA:
      return {
        ...state,
        isLoading: true,
        content: {},
      };
    case FETCH_EMPLOYER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
      };
    case FETCH_EMPLOYER_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
