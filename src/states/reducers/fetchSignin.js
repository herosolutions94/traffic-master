import {
  FETCH_SIGN_IN_CONTENT,
  FETCH_SIGN_IN_CONTENT_SUCCESS,
  FETCH_SIGN_IN_CONTENT_FAILED,
  SIGN_IN_ACCOUNT_MESSAGE,
  SIGN_IN_ACCOUNT_MESSAGE_SUCCESS,
  SIGN_IN_ACCOUNT_MESSAGE_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false,
  isFormProcessing: false,
  authToken: localStorage.getItem("authToken"),
  memData: null,
  memType: localStorage.getItem("memType"),
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_SIGN_IN_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {},
      };
    case FETCH_SIGN_IN_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
      };
    case FETCH_SIGN_IN_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case SIGN_IN_ACCOUNT_MESSAGE:
      return {
        ...state,
        isFormProcessing: true,
      };
    case SIGN_IN_ACCOUNT_MESSAGE_SUCCESS:
      localStorage.setItem("authToken", payload.authToken);
      localStorage.setItem("memName", payload.mem);
      localStorage.setItem("memType", payload.mem_type);
      localStorage.setItem("isFirstStepCompleted", true);
      localStorage.setItem("isSecondStepCompleted", true);
      return {
        ...state,
        isFormProcessing: true,
        memType: payload.mem_type,
      };
    case SIGN_IN_ACCOUNT_MESSAGE_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };
    default:
      return state;
  }
}
