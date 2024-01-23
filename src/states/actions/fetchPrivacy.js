import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_PRIVACY_POLICY_CONTENT,
  FETCH_PRIVACY_POLICY_CONTENT_SUCCESS,
  FETCH_PRIVACY_POLICY_CONTENT_FAILED
} from "./actionTypes";

export const fetchPrivacy = () => (dispatch) => {
  dispatch({
    type: FETCH_PRIVACY_POLICY_CONTENT,
    payload: null
  });
  http
    .post(
      "privacy-policy",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_PRIVACY_POLICY_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PRIVACY_POLICY_CONTENT_FAILED,
        payload: error
      });
    });
};
