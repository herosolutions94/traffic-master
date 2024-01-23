import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_JOB_TYPES,
  FETCH_JOB_TYPES_SUCCESS,
  FETCH_JOB_TYPES_FAILED,
} from "./actionTypes";

export const fetchJobTypes = () => (dispatch) => {
  dispatch({
    type: FETCH_JOB_TYPES,
    payload: null,
  });
  http
    .post(
      "fetch-job-types",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOB_TYPES_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOB_TYPES_FAILED,
        payload: error,
      });
    });
};
