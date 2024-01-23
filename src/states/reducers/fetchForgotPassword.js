import {
  FETCH_FORGOT_PASSWORD_CONTENT,
  FETCH_FORGOT_PASSWORD_CONTENT_SUCCESS,
  FETCH_FORGOT_PASSWORD_CONTENT_FAILED,
  FORGOT_PASSWORD_LINK,
  FORGOT_PASSWORD_LINK_SUCCESS,
  FORGOT_PASSWORD_LINK_FAILED
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
    case FETCH_FORGOT_PASSWORD_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_FORGOT_PASSWORD_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_FORGOT_PASSWORD_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    case FORGOT_PASSWORD_LINK:
      return {
        ...state,
        isFormProcessing: true
      };
    case FORGOT_PASSWORD_LINK_SUCCESS:
      return {
        ...state,
        isFormProcessing: false
      };
    case FORGOT_PASSWORD_LINK_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload
      };
    default:
      return state;
  }
}
