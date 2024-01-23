import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_FORGOT_PASSWORD_CONTENT,
  FETCH_FORGOT_PASSWORD_CONTENT_SUCCESS,
  FETCH_FORGOT_PASSWORD_CONTENT_FAILED,
  FORGOT_PASSWORD_LINK,
  FORGOT_PASSWORD_LINK_SUCCESS,
  FORGOT_PASSWORD_LINK_FAILED
} from "./actionTypes";

export const fetchForgotPassword = () => (dispatch) => {
  dispatch({
    type: FETCH_FORGOT_PASSWORD_CONTENT,
    payload: null
  });
  http
    .post(
      "forgot-password-content",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_FORGOT_PASSWORD_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_FORGOT_PASSWORD_CONTENT_FAILED,
        payload: error
      });
    });
};

export const sendLink = (formData) => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_LINK,
    payload: null
  });
  http
    .post("auth/forgot_password", helpers.doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "We’ve sent a reset password link to the email address you entered to reset your password. If you don’t see the email, check your spam folder or email.",
          TOAST_SETTINGS
        );
        dispatch({
          type: FORGOT_PASSWORD_LINK_SUCCESS,
          payload: data
        });
      } else {
        if (!data.status) {
          if (data.validationErrors) {
            toast.error(
              <Text string={data.validationErrors} parse={true} />,
              TOAST_SETTINGS
            );
          } else if (data.notExist) {
            toast.error("Email not exits", TOAST_SETTINGS);
          }
          dispatch({
            type: FORGOT_PASSWORD_LINK_FAILED,
            payload: null
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: FORGOT_PASSWORD_LINK_FAILED,
        payload: error
      });
    });
};

// export const signout = () => {
//   localStorage.removeItem("authToken");
//   window.location.replace("/signin");
// };
