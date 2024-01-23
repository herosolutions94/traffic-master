import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_JOB_LOCATIONS,
  FETCH_JOB_LOCATIONS_SUCCESS,
  FETCH_JOB_LOCATIONS_FAILED,
} from "./actionTypes";

export const fetchJobLocations = () => (dispatch) => {
  dispatch({
    type: FETCH_JOB_LOCATIONS,
    payload: null,
  });
  http
    .post(
      "fetch-job-locations",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOB_LOCATIONS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOB_LOCATIONS_FAILED,
        payload: error,
      });
    });
};
