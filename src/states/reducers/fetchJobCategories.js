import {
  FETCH_JOBS_CATEGORY,
  FETCH_JOBS_CATEGORY_SUCCESS,
  FETCH_JOBS_CATEGORY_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  content: {},
  categories: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_CATEGORY:
      return {
        ...state,
        isLoading: true,
        content: {},
        categories: [],
      };
    case FETCH_JOBS_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        categories: action.payload.categories,
      };
    case FETCH_JOBS_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
