import {
  FETCH_FETCH_JOB_CONTENT,
  FETCH_FETCH_JOB_CONTENT_SUCCESS,
  FETCH_FETCH_JOB_CONTENT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_FETCH_JOB_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_FETCH_JOB_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_FETCH_JOB_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
