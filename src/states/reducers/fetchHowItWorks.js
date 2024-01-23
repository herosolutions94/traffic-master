import {
  FETCH_HOW_IT_WORKS,
  FETCH_HOW_IT_WORKS_SUCCESS,
  FETCH_HOW_IT_WORKS_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_HOW_IT_WORKS:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_HOW_IT_WORKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_HOW_IT_WORKS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
