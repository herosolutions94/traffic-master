import {
  JOB_PUSH,
  JOB_PUSH_SUCCESS,
  JOB_PUSH_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isFormProcessing: false,
  content: {},
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case JOB_PUSH:
      return {
        ...state,
        isFormProcessing: true,
        content: {},
      };
    case JOB_PUSH_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
        content: action.payload,
      };
    case JOB_PUSH_FAILED:
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
