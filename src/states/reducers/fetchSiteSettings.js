import {
  FETCH_SITE_SETTINGS,
  FETCH_SITE_SETTINGS_SUCCESS,
  FETCH_SITE_SETTINGS_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  siteSettings: null,
  memData: null,
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_SITE_SETTINGS:
      return {
        ...state,
        isLoading: true,
        siteSettings: null,
        memData: null
      };
    case FETCH_SITE_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        siteSettings: payload.site_settings,
        memData: payload.memData
      };
    case FETCH_SITE_SETTINGS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
        memData: null
      };
    default:
      return state;
  }
}
