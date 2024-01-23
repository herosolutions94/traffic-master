import http from "../../helpers/http";
import httpBlob from "../../helpers/http-blob";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_SIGN_UP_CONTENT,
  FETCH_SIGN_UP_CONTENT_SUCCESS,
  FETCH_SIGN_UP_CONTENT_FAILED,
  CREATE_ACCOUNT_MESSAGE,
  CREATE_ACCOUNT_MESSAGE_SUCCESS,
  CREATE_ACCOUNT_MESSAGE_FAILED
} from "./actionTypes";

export const fetchSignup = () => (dispatch) => {
  dispatch({
    type: FETCH_SIGN_UP_CONTENT,
    payload: null
  });
  http
    .post(
      "signup",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_SIGN_UP_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SIGN_UP_CONTENT_FAILED,
        payload: error
      });
    });
};

export const createAccount = (formData) => (dispatch) => {
  formData = helpers.doObjToFormData(formData);
  dispatch({
    type: CREATE_ACCOUNT_MESSAGE,
    payload: null
  });
  http
    .post("auth/create-account", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "Account have been created successfully. Redirecting to dashboard, please wait...",
          TOAST_SETTINGS
        );
        dispatch({
          type: CREATE_ACCOUNT_MESSAGE_SUCCESS,
          payload: data
        });
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 6000);
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: CREATE_ACCOUNT_MESSAGE_FAILED,
            payload: null
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: CREATE_ACCOUNT_MESSAGE_FAILED,
        payload: error
      });
    });
};
