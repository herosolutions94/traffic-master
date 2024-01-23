import {
  FETCH_VIDEO_INTERVIEW_CONTENT,
  FETCH_VIDEO_INTERVIEW_CONTENT_SUCCESS,
  FETCH_VIDEO_INTERVIEW_CONTENT_FAILED,
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
    case FETCH_VIDEO_INTERVIEW_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_VIDEO_INTERVIEW_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_VIDEO_INTERVIEW_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
