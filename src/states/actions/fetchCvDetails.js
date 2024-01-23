import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_CV_DETAILS,
  FETCH_CV_DETAILS_SUCCESS,
  FETCH_CV_DETAILS_FAILED,
} from "./actionTypes";

export const fetchCVDetails = () => (dispatch) => {
  dispatch({
    type: FETCH_CV_DETAILS,
    payload: null,
  });
  http
    .post(
      "fetch-cv-details",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_CV_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CV_DETAILS_FAILED,
        payload: error,
      });
    });
};
