import {
  FETCH_CATEGORY_QUESTIONS,
  FETCH_CATEGORY_QUESTIONS_SUCCESS,
  FETCH_CATEGORY_QUESTIONS_FAILED,
  SAVE_INTERVIEW_VIDEO,
  SAVE_INTERVIEW_VIDEO_SUCCESS,
  SAVE_INTERVIEW_VIDEO_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CATEGORY_QUESTIONS:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_CATEGORY_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_CATEGORY_QUESTIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
