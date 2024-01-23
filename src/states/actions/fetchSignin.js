import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_SIGN_IN_CONTENT,
  FETCH_SIGN_IN_CONTENT_SUCCESS,
  FETCH_SIGN_IN_CONTENT_FAILED,
  SIGN_IN_ACCOUNT_MESSAGE,
  SIGN_IN_ACCOUNT_MESSAGE_SUCCESS,
  SIGN_IN_ACCOUNT_MESSAGE_FAILED,
} from "./actionTypes";

export const fetchSignin = () => (dispatch) => {
  dispatch({
    type: FETCH_SIGN_IN_CONTENT,
    payload: null,
  });
  http
    .post(
      "signin",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_SIGN_IN_CONTENT_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SIGN_IN_CONTENT_FAILED,
        payload: error,
      });
    });
};

export const signin = (formData) => (dispatch) => {
  dispatch({
    type: SIGN_IN_ACCOUNT_MESSAGE,
    payload: null,
  });
  http
    .post("auth/signin", helpers.doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "Signin successfully. Redirecting to dashboard, please wait...",
          TOAST_SETTINGS
        );
        dispatch({
          type: SIGN_IN_ACCOUNT_MESSAGE_SUCCESS,
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
            type: SIGN_IN_ACCOUNT_MESSAGE_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: SIGN_IN_ACCOUNT_MESSAGE_FAILED,
        payload: error,
      });
    });
};

// export const signout = () => {
//   localStorage.removeItem("authToken");
//   window.location.replace("/signin");
// };
