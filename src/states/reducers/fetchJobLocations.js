import {
  FETCH_JOB_LOCATIONS,
  FETCH_JOB_LOCATIONS_SUCCESS,
  FETCH_JOB_LOCATIONS_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  locations: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_LOCATIONS:
      return {
        ...state,
        isLoading: true,
        locations: [],
      };
    case FETCH_JOB_LOCATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        locations: action.payload.locations,
      };
    case FETCH_JOB_LOCATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        locations: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
