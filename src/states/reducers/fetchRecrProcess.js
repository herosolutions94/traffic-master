import {
  FETCH_RECR_PROCESS_CONTENT,
  FETCH_RECR_PROCESS_CONTENT_SUCCESS,
  FETCH_RECR_PROCESS_CONTENT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_RECR_PROCESS_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_RECR_PROCESS_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_RECR_PROCESS_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        error: payload
      };
    default:
      return state;
  }
}
