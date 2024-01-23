import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_JOB_DETAILS,
  FETCH_JOB_DETAILS_SUCCESS,
  FETCH_JOB_DETAILS_FAILED,
} from "./actionTypes";

export const fetchJobDetails = (jobId) => (dispatch) => {
  dispatch({
    type: FETCH_JOB_DETAILS,
    payload: null,
  });
  http
    .post(
      "fetch-job-details",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
        job_id: jobId,
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOB_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOB_DETAILS_FAILED,
        payload: error,
      });
    });
};
