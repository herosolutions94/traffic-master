import {
  FETCH_CANDIDATE_APPLICATIONS,
  FETCH_CANDIDATE_APPLICATIONS_SUCCESS,
  FETCH_CANDIDATE_APPLICATIONS_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  content: {},
  applications: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CANDIDATE_APPLICATIONS:
      return {
        ...state,
        isLoading: true,
        content: {},
        applications: [],
      };
    case FETCH_CANDIDATE_APPLICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        applications: action.payload.applications,
      };
    case FETCH_CANDIDATE_APPLICATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        applications: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
