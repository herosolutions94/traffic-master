import {
  FETCH_UNI_VS_EMP_CONTENT,
  FETCH_UNI_VS_EMP_CONTENT_SUCCESS,
  FETCH_UNI_VS_EMP_CONTENT_FAILED
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  content: {},
  error: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_UNI_VS_EMP_CONTENT:
      return {
        ...state,
        isLoading: true,
        content: {}
      };
    case FETCH_UNI_VS_EMP_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload
      };
    case FETCH_UNI_VS_EMP_CONTENT_FAILED:
      return {
        ...state,
        isLoading: false,
        content: {},
        error: payload
      };
    default:
      return state;
  }
}
