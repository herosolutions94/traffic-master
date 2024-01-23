import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_JOBS_SUB_CATEGORY,
  FETCH_JOBS_SUB_CATEGORY_SUCCESS,
  FETCH_JOBS_SUB_CATEGORY_FAILED,
} from "./actionTypes";

export const fetchJobSubCategories = (category_id) => (dispatch) => {
  dispatch({
    type: FETCH_JOBS_SUB_CATEGORY,
    payload: null,
  });
  http
    .post(
      "fetch-job-sub-categories",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
        category_id: category_id,
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOBS_SUB_CATEGORY_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOBS_SUB_CATEGORY_FAILED,
        payload: error,
      });
    });
};
