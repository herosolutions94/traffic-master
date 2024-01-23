import {
  FETCH_JOBS_SUB_CATEGORY,
  FETCH_JOBS_SUB_CATEGORY_SUCCESS,
  FETCH_JOBS_SUB_CATEGORY_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  subCategories: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_SUB_CATEGORY:
      return {
        ...state,
        isLoading: true,
        subCategories: [],
      };
    case FETCH_JOBS_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subCategories: action.payload.sub_categories,
      };
    case FETCH_JOBS_SUB_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        subCategories: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
