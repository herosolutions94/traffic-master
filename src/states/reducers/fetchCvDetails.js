import {
  FETCH_CV_DETAILS,
  FETCH_CV_DETAILS_SUCCESS,
  FETCH_CV_DETAILS_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CV_DETAILS:
      return {
        ...state,
        isLoading: true,
        content: {},
      };
    case FETCH_CV_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
      };
    case FETCH_CV_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        error: payload,
      };
    default:
      return state;
  }
}
