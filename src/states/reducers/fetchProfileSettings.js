import {
  FETCH_PROFILE_SETTINGS,
  FETCH_PROFILE_SETTINGS_SUCCESS,
  FETCH_PROFILE_SETTINGS_FAILED,
  SAVE_PROFILE_SETTINGS,
  SAVE_PROFILE_SETTINGS_SUCCESS,
  SAVE_PROFILE_SETTINGS_FAILED,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isFormProcessing: false,
  isPassChangeProcessing: false,
  content: {},
  mem: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PROFILE_SETTINGS:
      return {
        ...state,
        isLoading: true,
        content: {},
        mem: {}
      };
    case FETCH_PROFILE_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        mem: payload.mem
      };
    case FETCH_PROFILE_SETTINGS_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        mem: {},
        error: payload
      };
    case SAVE_PROFILE_SETTINGS:
      return {
        ...state,
        isFormProcessing: true
      };
    case SAVE_PROFILE_SETTINGS_SUCCESS:
      return {
        ...state,
        isFormProcessing: false
      };
    case SAVE_PROFILE_SETTINGS_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        isPassChangeProcessing: true
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isPassChangeProcessing: false
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isPassChangeProcessing: false,
        error: payload
      };
    default:
      return state;
  }
}
