import {
  FETCH_JOB_TYPES,
  FETCH_JOB_TYPES_SUCCESS,
  FETCH_JOB_TYPES_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  content: {},
  jobTypes: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_TYPES:
      return {
        ...state,
        isLoading: true,
        content: {},
        jobTypes: [],
      };
    case FETCH_JOB_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        jobTypes: action.payload.job_types,
      };
    case FETCH_JOB_TYPES_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        jobTypes: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
