import {
  FETCH_COVER_LETTER_BUILDER_CONTENT,
  FETCH_COVER_LETTER_BUILDER_CONTENT_SUCCESS,
  FETCH_COVER_LETTER_BUILDER_CONTENT_FAILED,
  SAVE_COVER,
  SAVE_COVER_SUCCESS,
  SAVE_COVER_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isCoverSubmitting: false,
  coverAction: null,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_COVER_LETTER_BUILDER_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_COVER_LETTER_BUILDER_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_COVER_LETTER_BUILDER_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        error: payload
      };
    case SAVE_COVER:
      return {
        ...state,
        isCoverSubmitting: true,
        coverAction: "save"
      };
    case SAVE_COVER_SUCCESS:
      return {
        ...state,
        isCoverSubmitting: false,
        coverAction: null
      };
    case SAVE_COVER_FAILED:
      return {
        ...state,
        isCoverSubmitting: false,
        coverAction: null,
        error: payload
      };
    default:
      return state;
  }
}
