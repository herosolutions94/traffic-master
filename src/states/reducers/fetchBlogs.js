import {
  FETCH_BLOGS_CONTENT,
  FETCH_BLOGS_CONTENT_SUCCESS,
  FETCH_BLOGS_CONTENT_FAILED,
  FETCH_BLOGS_SEARCH,
  FETCH_BLOGS_SEARCH_SUCCESS,
  FETCH_BLOGS_SEARCH_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  content: {},
  blogs: [],
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_BLOGS_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {},
        blogs: []
      };
    case FETCH_BLOGS_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        blogs: payload.blogs
      };
    case FETCH_BLOGS_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        blogs: [],
        error: payload
      };
    case FETCH_BLOGS_SEARCH:
      return {
        ...state,
        isSearching: true
      };
    case FETCH_BLOGS_SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        blogs: payload.blogs
      };
    case FETCH_BLOGS_SEARCH_FAILED:
      return {
        ...state,
        isSearching: false,
        error: payload
      };
    default:
      return state;
  }
}
