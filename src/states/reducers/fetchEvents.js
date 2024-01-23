import {
  FETCH_EVENTS_CONTENT,
  FETCH_EVENTS_CONTENT_SUCCESS,
  FETCH_EVENTS_CONTENT_FAILED,
  FETCH_EVENTS_SEARCH,
  FETCH_EVENTS_SEARCH_SUCCESS,
  FETCH_EVENTS_SEARCH_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSearching: false,
  content: {},
  events: [],
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EVENTS_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {},
        events: []
      };
    case FETCH_EVENTS_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        events: payload.events
      };
    case FETCH_EVENTS_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        events: [],
        error: payload
      };
    case FETCH_EVENTS_SEARCH:
      return {
        ...state,
        isSearching: true
      };
    case FETCH_EVENTS_SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        events: payload.events
      };
    case FETCH_EVENTS_SEARCH_FAILED:
      return {
        ...state,
        isSearching: false,
        error: payload
      };
    default:
      return state;
  }
}
