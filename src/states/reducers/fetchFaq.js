import {
  FETCH_FAQ_CONTENT,
  FETCH_FAQ_CONTENT_SUCCESS,
  FETCH_FAQ_CONTENT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_FAQ_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_FAQ_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_FAQ_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
