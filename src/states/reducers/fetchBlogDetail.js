import {
  FETCH_BLOG_DETAIL_CONTENT,
  FETCH_BLOG_DETAIL_CONTENT_SUCCESS,
  FETCH_BLOG_DETAIL_CONTENT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_BLOG_DETAIL_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_BLOG_DETAIL_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_BLOG_DETAIL_CONTENT_FAILED:
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
