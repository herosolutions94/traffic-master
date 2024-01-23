import {
  SAVE_EMAIL_FOR_NEWSLETTER,
  SAVE_EMAIL_FOR_NEWSLETTER_SUCCESS,
  SAVE_EMAIL_FOR_NEWSLETTER_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isFormProcessing: false,
  content: {},
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_EMAIL_FOR_NEWSLETTER:
      return {
        ...state,
        isFormProcessing: true,
        content: {},
      };
    case SAVE_EMAIL_FOR_NEWSLETTER_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
        content: action.payload,
      };
    case SAVE_EMAIL_FOR_NEWSLETTER_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        content: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
