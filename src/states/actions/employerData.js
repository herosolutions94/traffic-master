import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_EMPLOYER_DATA,
  FETCH_EMPLOYER_DATA_SUCCESS,
  FETCH_EMPLOYER_DATA_FAILED,
} from "./actionTypes";

export const fetchEmployerData = () => (dispatch) => {
  dispatch({
    type: FETCH_EMPLOYER_DATA,
    payload: null,
  });
  http
    .post(
      "fetch-employer-data",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_EMPLOYER_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_EMPLOYER_DATA_FAILED,
        payload: error,
      });
    });
};
