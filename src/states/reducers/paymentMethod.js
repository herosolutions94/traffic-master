import {
  SAVE_PAYMENT_METHOD,
  SAVE_PAYMENT_METHOD_SUCCESS,
  SAVE_PAYMENT_METHOD_FAILED,
  FETCH_PAYMENT_METHODS,
  FETCH_PAYMENT_METHODS_SUCCESS,
  FETCH_PAYMENT_METHODS_FAILED,
  DELETE_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD_SUCCESS,
  DELETE_PAYMENT_METHOD_FAILED,
  FETCH_PAYMENT_METHOD_DETAILS,
  FETCH_PAYMENT_METHOD_DETAILS_SUCCESS,
  FETCH_PAYMENT_METHOD_DETAILS_FAILED,
  UPDATE_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD_SUCCESS,
  UPDATE_PAYMENT_METHOD_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isFormProcessing: false,
  isLoading: false,
  data: {},
  error: null,
  paymentMethods: [],
  isDeleting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        isFormProcessing: true,
        data: {},
        error: null,
      };
    case SAVE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
        data: action.payload,
        error: null,
      };
    case SAVE_PAYMENT_METHOD_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        data: {},
        error: action.payload,
      };
    case FETCH_PAYMENT_METHODS:
      return {
        ...state,
        isLoading: true,
        paymentMethods: [],
        error: null,
      };
    case FETCH_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentMethods: action.payload.payment_methods,
        error: null,
      };
    case FETCH_PAYMENT_METHODS_FAILED:
      return {
        ...state,
        isLoading: false,
        paymentMethods: [],
        error: action.payload,
      };
    case DELETE_PAYMENT_METHOD:
      return {
        ...state,
        isDeleting: true,
        error: null,
      };
    case DELETE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        paymentMethods: action.payload.payment_methods,
        error: null,
      };
    case DELETE_PAYMENT_METHOD_FAILED:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
      };
    case FETCH_PAYMENT_METHOD_DETAILS:
      return {
        ...state,
        isLoading: true,
        data: {},
        error: null,
      };
    case FETCH_PAYMENT_METHOD_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.payment_method,
        error: null,
      };
    case FETCH_PAYMENT_METHOD_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.payload,
      };
    case UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        isFormProcessing: true,
        // data: {},
        error: null,
      };
    case UPDATE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
        // data: action.payload,
        error: null,
      };
    case UPDATE_PAYMENT_METHOD_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        // data: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
