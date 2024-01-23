import {
  FETCH_EMPLOYER_JOBS,
  FETCH_EMPLOYER_JOBS_SUCCESS,
  FETCH_EMPLOYER_JOBS_FAILED,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILED,
  UPDATE_JOB,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILED,
  APPLY_ON_JOB,
  APPLY_ON_JOB_SUCCESS,
  APPLY_ON_JOB_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  content: {},
  jobs: [],
  error: false,
  isFormProcessing: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYER_JOBS:
      return {
        ...state,
        isLoading: true,
        content: {},
        jobs: [],
      };
    case FETCH_EMPLOYER_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        jobs: action.payload.jobs,
      };
    case FETCH_EMPLOYER_JOBS_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        jobs: [],
        error: action.payload,
      };
    case DELETE_JOB:
      return {
        ...state,
        isLoading: true,
        content: {},
        jobs: [],
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        jobs: action.payload.jobs,
      };
    case DELETE_JOB_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        jobs: [],
        error: action.payload,
      };
    case UPDATE_JOB:
      return {
        ...state,
        isLoading: true,
        content: {},
        jobs: [],
        isFormProcessing: true,
      };
    case UPDATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        jobs: action.payload.jobs,
        isFormProcessing: true,
      };
    case UPDATE_JOB_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        jobs: [],
        error: action.payload,
        isFormProcessing: false,
      };
    case APPLY_ON_JOB:
      return {
        ...state,
        isLoading: true,
        content: {},
        jobs: [],
        isFormProcessing: true,
      };
    case APPLY_ON_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.payload,
        jobs: action.payload.jobs,
        isFormProcessing: true,
      };
    case APPLY_ON_JOB_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        jobs: [],
        error: action.payload,
        isFormProcessing: false,
      };
    default:
      return state;
  }
}
