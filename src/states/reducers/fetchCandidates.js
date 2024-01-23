import {
  FETCH_CANDIDATES_CONTENT,
  FETCH_CANDIDATES_CONTENT_SUCCESS,
  FETCH_CANDIDATES_CONTENT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CANDIDATES_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_CANDIDATES_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_CANDIDATES_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
