import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_JOBS_CATEGORY,
  FETCH_JOBS_CATEGORY_SUCCESS,
  FETCH_JOBS_CATEGORY_FAILED,
} from "./actionTypes";

export const fetchJobCategories = () => (dispatch) => {
  dispatch({
    type: FETCH_JOBS_CATEGORY,
    payload: null,
  });
  http
    .post(
      "fetch-jobs-categories",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOBS_CATEGORY_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOBS_CATEGORY_FAILED,
        payload: error,
      });
    });
};
