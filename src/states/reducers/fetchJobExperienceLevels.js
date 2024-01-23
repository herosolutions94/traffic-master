import {
  FETCH_JOB_EXPERIENCE_LEVELS,
  FETCH_JOB_EXPERIENCE_LEVELS_SUCCESS,
  FETCH_JOB_EXPERIENCE_LEVELS_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  experienceLevels: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_EXPERIENCE_LEVELS:
      return {
        ...state,
        isLoading: true,
        experienceLevels: [],
      };
    case FETCH_JOB_EXPERIENCE_LEVELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experienceLevels: action.payload.experience_levels,
      };
    case FETCH_JOB_EXPERIENCE_LEVELS_FAILED:
      return {
        ...state,
        isLoading: false,
        experienceLevels: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
