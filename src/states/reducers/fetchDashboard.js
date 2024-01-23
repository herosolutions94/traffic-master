import {
  FETCH_DASHBOARD,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILED,
  //   FETCH_JOBS_SEARCH,
  //   FETCH_JOBS_SEARCH_SUCCESS,
  //   FETCH_JOBS_SEARCH_FAILED,
  SAVE_JOB_STAT,
  SAVE_JOB_STAT_SUCCESS,
  SAVE_JOB_STAT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isStatUpdating: false,
  //   isJobSaving: false,
  content: {},
  jobs: [],
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_DASHBOARD:
      return {
        ...state,
        isLoading: true,
        content: {},
        jobs: []
      };
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        jobs: payload.jobs
      };
    case FETCH_DASHBOARD_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        jobs: [],
        error: payload
      };
    // case FETCH_JOBS_SEARCH:
    //   return {
    //     ...state,
    //     isSearching: true
    //   };
    // case FETCH_JOBS_SEARCH_SUCCESS:
    //   return {
    //     ...state,
    //     isSearching: false,
    //     jobs: payload.jobs
    //   };
    // case FETCH_JOBS_SEARCH_FAILED:
    //   return {
    //     ...state,
    //     isSearching: false,
    //     error: payload
    //   };
    case SAVE_JOB_STAT:
      return {
        ...state,
        isStatUpdating: true
      };
    case SAVE_JOB_STAT_SUCCESS:
      return {
        ...state,
        isStatUpdating: false,
        jobs: payload.jobs
      };
    case SAVE_JOB_STAT_FAILED:
      return {
        ...state,
        isStatUpdating: false,
        error: payload
      };
    default:
      return state;
  }
}
