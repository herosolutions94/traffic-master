import {
  FETCH_JOBS_CONTENT,
  FETCH_JOBS_CONTENT_SUCCESS,
  FETCH_JOBS_CONTENT_FAILED,
  FETCH_JOBS_SEARCH,
  FETCH_JOBS_SEARCH_SUCCESS,
  FETCH_JOBS_SEARCH_FAILED,
  SAVE_JOB,
  SAVE_JOB_SUCCESS,
  SAVE_JOB_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  isJobSaving: false,
  content: {},
  jobs: [],
  error: false,
  isFormProcessing: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_JOBS_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {},
        jobs: [],
      };
    case FETCH_JOBS_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        jobs: payload.jobs,
      };
    case FETCH_JOBS_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        jobs: [],
        error: payload,
      };
    case FETCH_JOBS_SEARCH:
      return {
        ...state,
        isSearching: true,
      };
    case FETCH_JOBS_SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        jobs: payload.jobs,
      };
    case FETCH_JOBS_SEARCH_FAILED:
      return {
        ...state,
        isSearching: false,
        error: payload,
      };
    case SAVE_JOB:
      return {
        ...state,
        isJobSaving: true,
        isFormProcessing: true,
      };
    case SAVE_JOB_SUCCESS:
      const newJobs = state.jobs.map((job, index) => {
        if (job.id === payload.id) {
          job.saved = true;
        }
        return job;
      });
      return {
        ...state,
        isJobSaving: false,
        jobs: newJobs,
        isFormProcessing: true,
      };
    case SAVE_JOB_FAILED:
      return {
        ...state,
        isJobSaving: false,
        error: payload,
        isFormProcessing: false,
      };
    default:
      return state;
  }
}
