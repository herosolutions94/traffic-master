import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_JOB_EXPERIENCE_LEVELS,
  FETCH_JOB_EXPERIENCE_LEVELS_SUCCESS,
  FETCH_JOB_EXPERIENCE_LEVELS_FAILED,
} from "./actionTypes";

export const fetchJobExperienceLevels = () => (dispatch) => {
  dispatch({
    type: FETCH_JOB_EXPERIENCE_LEVELS,
    payload: null,
  });
  http
    .post(
      "fetch-job-experience-levels",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOB_EXPERIENCE_LEVELS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOB_EXPERIENCE_LEVELS_FAILED,
        payload: error,
      });
    });
};
