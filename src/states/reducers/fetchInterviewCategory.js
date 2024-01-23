import {
  FETCH_INTERVIEW_CATEGORY_INSTRUCTION,
  FETCH_INTERVIEW_CATEGORY_INSTRUCTION_SUCCESS,
  FETCH_INTERVIEW_CATEGORY_INSTRUCTION_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_INTERVIEW_CATEGORY_INSTRUCTION:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_INTERVIEW_CATEGORY_INSTRUCTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_INTERVIEW_CATEGORY_INSTRUCTION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
