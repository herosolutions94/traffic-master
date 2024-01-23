import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_RESET_PASSWORD_CONTENT,
  FETCH_RESET_PASSWORD_CONTENT_SUCCESS,
  FETCH_RESET_PASSWORD_CONTENT_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from "./actionTypes";

export const fetchResetPassword = () => (dispatch) => {
  dispatch({
    type: FETCH_RESET_PASSWORD_CONTENT,
    payload: null
  });
  http
    .post(
      "reset-password-content",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_RESET_PASSWORD_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_RESET_PASSWORD_CONTENT_FAILED,
        payload: error
      });
    });
};

export const setPassword = (formData) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD,
    payload: null
  });
  http
    .post("auth/reset_password", helpers.doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "You have successfully changed your password. Redirecting to sign in, please wait...",
          TOAST_SETTINGS
        );
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: data
        });
        setTimeout(() => {
          window.location.replace("/signin");
        }, 4000);
      } else {
        if (!data.status) {
          if (data.validationErrors) {
            toast.error(
              <Text string={data.validationErrors} parse={true} />,
              TOAST_SETTINGS
            );
          } else if (data.notExist) {
            toast.error(
              "Unknown or expired password reset. Please go to forgot password and get a link again.",
              TOAST_SETTINGS
            );
          }
          dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: null
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: error
      });
    });
};

// export const signout = () => {
//   localStorage.removeItem("authToken");
//   window.location.replace("/signin");
// };
