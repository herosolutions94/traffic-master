import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

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
} from "./actionTypes";

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: null,
  });
  http
    .post(
      "save-payment-method",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        data: paymentMethod,
      })
    )
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "Payment method has been saved successfully.",
          TOAST_SETTINGS
        );
        dispatch({
          type: SAVE_PAYMENT_METHOD_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/employer/payment-method");
        }, 3000);
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: SAVE_PAYMENT_METHOD_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error("Something went wrong!", TOAST_SETTINGS);
      dispatch({
        type: SAVE_PAYMENT_METHOD_FAILED,
        payload: error,
      });
    });
};

export const fetchPaymentMethods = () => (dispatch) => {
  dispatch({
    type: FETCH_PAYMENT_METHODS,
    payload: null,
  });
  http
    .post(
      "fetch-payment-methods",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
      })
    )
    .then(({ data }) => {
      if (data.status) {
        dispatch({
          type: FETCH_PAYMENT_METHODS_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: FETCH_PAYMENT_METHODS_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error("Something went wrong!", TOAST_SETTINGS);
      dispatch({
        type: FETCH_PAYMENT_METHODS_FAILED,
        payload: error,
      });
    });
};

export const fetchPaymentMethodDetails = (paymentMethodId) => (dispatch) => {
  dispatch({
    type: FETCH_PAYMENT_METHOD_DETAILS,
    payload: null,
  });
  http
    .post(
      "fetch-payment-method-details",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        paymentMethodId: paymentMethodId,
      })
    )
    .then(({ data }) => {
      if (data.status) {
        dispatch({
          type: FETCH_PAYMENT_METHOD_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: FETCH_PAYMENT_METHOD_DETAILS_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error("Something went wrong!", TOAST_SETTINGS);
      dispatch({
        type: FETCH_PAYMENT_METHOD_DETAILS_FAILED,
        payload: error,
      });
    });
};

export const deletePaymentMethod = (paymentMethodId) => (dispatch) => {
  dispatch({
    type: DELETE_PAYMENT_METHOD,
    payload: null,
  });
  http
    .post(
      "delete-payment-method",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        paymentMethodId: paymentMethodId,
      })
    )
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "Payment method has been deleted successfully.",
          TOAST_SETTINGS
        );
        dispatch({
          type: DELETE_PAYMENT_METHOD_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: DELETE_PAYMENT_METHOD_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error("Something went wrong!", TOAST_SETTINGS);
      dispatch({
        type: DELETE_PAYMENT_METHOD_FAILED,
        payload: error,
      });
    });
};

export const updatePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: UPDATE_PAYMENT_METHOD,
    payload: null,
  });
  http
    .post(
      "update-payment-method",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        data: paymentMethod,
      })
    )
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "Payment method has been updated successfully.",
          TOAST_SETTINGS
        );
        dispatch({
          type: UPDATE_PAYMENT_METHOD_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/employer/payment-method");
        }, 3000);
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: UPDATE_PAYMENT_METHOD_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error("Something went wrong!", TOAST_SETTINGS);
      dispatch({
        type: UPDATE_PAYMENT_METHOD_FAILED,
        payload: error,
      });
    });
};
