import {
  FETCH_JOB_APPLICANTS,
  FETCH_JOB_APPLICANTS_SUCCESS,
  FETCH_JOB_APPLICANTS_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  content: {},
  applicants: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_APPLICANTS:
      return {
        ...state,
        isLoading: true,
        content: {},
        applicants: [],
      };
    case FETCH_JOB_APPLICANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        applicants: action.payload.applicants,
      };
    case FETCH_JOB_APPLICANTS_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        applicants: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
