import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_JOB_APPLICANTS,
  FETCH_JOB_APPLICANTS_SUCCESS,
  FETCH_JOB_APPLICANTS_FAILED,
} from "./actionTypes";

export const fetchJobApplicants = (jobId) => (dispatch) => {
  dispatch({
    type: FETCH_JOB_APPLICANTS,
    payload: null,
  });
  http
    .post(
      "fetch-job-applicants",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        job_id: jobId,
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOB_APPLICANTS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOB_APPLICANTS_FAILED,
        payload: error,
      });
    });
};
