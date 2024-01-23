import {
  FETCH_JOB_DETAILS,
  FETCH_JOB_DETAILS_SUCCESS,
  FETCH_JOB_DETAILS_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  jobDetails: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_DETAILS:
      return {
        ...state,
        isLoading: true,
        jobDetails: [],
      };
    case FETCH_JOB_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobDetails: action.payload,
      };
    case FETCH_JOB_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        jobDetails: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
