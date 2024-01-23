import {
  FETCH_RESET_PASSWORD_CONTENT,
  FETCH_RESET_PASSWORD_CONTENT_SUCCESS,
  FETCH_RESET_PASSWORD_CONTENT_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false,
  isFormProcessing: false,
  authToken: localStorage.getItem("authToken"),
  memData: null
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_RESET_PASSWORD_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_RESET_PASSWORD_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_RESET_PASSWORD_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    case RESET_PASSWORD:
      return {
        ...state,
        isFormProcessing: true
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isFormProcessing: false
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload
      };
    default:
      return state;
  }
}
