import {
  FETCH_EVENT_DETAIL_CONTENT,
  FETCH_EVENT_DETAIL_CONTENT_SUCCESS,
  FETCH_EVENT_DETAIL_CONTENT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EVENT_DETAIL_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {},
        events: []
      };
    case FETCH_EVENT_DETAIL_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        events: payload.events
      };
    case FETCH_EVENT_DETAIL_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        events: [],
        error: payload
      };
    default:
      return state;
  }
}
