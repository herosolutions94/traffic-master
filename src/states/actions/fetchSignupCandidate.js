import http from "../../helpers/http";
import httpBlob from "../../helpers/http-blob";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_SIGN_UP_CANDIDATE_CONTENT,
  FETCH_SIGN_UP_CANDIDATE_CONTENT_SUCCESS,
  FETCH_SIGN_UP_CANDIDATE_CONTENT_FAILED,
  CREATE_CANDIDATE_ACCOUNT_MESSAGE,
  CREATE_CANDIDATE_ACCOUNT_MESSAGE_SUCCESS,
  CREATE_CANDIDATE_ACCOUNT_MESSAGE_FAILED,
  BACK_TO_SIGNUP,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
} from "./actionTypes";

export const fetchSignupCandidate = () => (dispatch) => {
  dispatch({
    type: FETCH_SIGN_UP_CANDIDATE_CONTENT,
    payload: null,
  });
  http
    .post(
      "signup-candidate",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_SIGN_UP_CANDIDATE_CONTENT_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SIGN_UP_CANDIDATE_CONTENT_FAILED,
        payload: error,
      });
    });
};

export const createAccount = (formData) => (dispatch) => {
  formData = { ...formData };
  let image = formData.image[0];
  let file = formData.cv?.target?.files[0];
  delete formData.image;
  delete formData.cv;
  formData = helpers.doObjToFormData(formData);
  if (typeof image !== "undefined") {
    formData.append("image", image);
  }
  if (typeof file !== "undefined") {
    formData.append("cv", file);
  }
  dispatch({
    type: CREATE_CANDIDATE_ACCOUNT_MESSAGE,
    payload: null,
  });
  http
    .post("auth/create-candidate-account", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "Account have been created successfully. We have sent the verification code to your email.",
          TOAST_SETTINGS
        );
        dispatch({
          type: CREATE_CANDIDATE_ACCOUNT_MESSAGE_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: CREATE_CANDIDATE_ACCOUNT_MESSAGE_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: CREATE_CANDIDATE_ACCOUNT_MESSAGE_FAILED,
        payload: error,
      });
    });
};

export const backToSignup = () => (dispatch) => {
  dispatch({
    type: BACK_TO_SIGNUP,
    payload: null,
  });
};

export const verifyEmail = (formData) => (dispatch) => {
  formData = helpers.doObjToFormData(formData);
  dispatch({
    type: VERIFY_EMAIL,
    payload: null,
  });
  http
    .post("auth/verify-email", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "The email has been verified successfully. Redirecting…",
          TOAST_SETTINGS
        );
        dispatch({
          type: VERIFY_EMAIL_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace(`${data.mem_type}/dashboard`);
        }, 3000);
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: VERIFY_EMAIL_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: VERIFY_EMAIL_FAILED,
        payload: error,
      });
    });
};
