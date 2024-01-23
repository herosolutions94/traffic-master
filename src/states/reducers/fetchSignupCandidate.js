import {
  FETCH_SIGN_UP_CANDIDATE_CONTENT,
  FETCH_SIGN_UP_CANDIDATE_CONTENT_SUCCESS,
  FETCH_SIGN_UP_CANDIDATE_CONTENT_FAILED,
  CREATE_CANDIDATE_ACCOUNT_MESSAGE,
  CREATE_CANDIDATE_ACCOUNT_MESSAGE_SUCCESS,
  CREATE_CANDIDATE_ACCOUNT_MESSAGE_FAILED,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
  BACK_TO_SIGNUP,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false,
  isFormProcessing: false,
  isFirstStepCompleted: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_SIGN_UP_CANDIDATE_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {},
      };
    case FETCH_SIGN_UP_CANDIDATE_CONTENT_SUCCESS:
      return { 
        ...state,
        isLoading: false,
        content: payload,
      };
    case FETCH_SIGN_UP_CANDIDATE_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CREATE_CANDIDATE_ACCOUNT_MESSAGE:
      return {
        ...state,
        isFormProcessing: true,
      };
    case CREATE_CANDIDATE_ACCOUNT_MESSAGE_SUCCESS:
      localStorage.setItem("isFirstStepCompleted", true);
      localStorage.setItem("email", payload.email);
      return {
        ...state,
        isFormProcessing: false,
        isFirstStepCompleted: true,
      };
    case CREATE_CANDIDATE_ACCOUNT_MESSAGE_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };
    case BACK_TO_SIGNUP:
      return {
        ...state,
        isFirstStepCompleted: false,
      };
    case VERIFY_EMAIL:
      return {
        ...state,
        isFormProcessing: true,
      };
    case VERIFY_EMAIL_SUCCESS:
      localStorage.removeItem("isFirstStepCompleted");
      localStorage.removeItem("email");
      localStorage.setItem("authToken", payload.authToken);
      localStorage.setItem("memName", payload.mem);
      localStorage.setItem("memType", payload.mem_type);
      return {
        ...state,
        isFormProcessing: true,
      };
    case VERIFY_EMAIL_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };
    default:
      return state;
  }
}
