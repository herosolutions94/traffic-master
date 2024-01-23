import http from "../../helpers/http";

import {
  FETCH_CAREERS_CONTENT,
  FETCH_CAREERS_CONTENT_SUCCESS,
  FETCH_CAREERS_CONTENT_FAILED
} from "./actionTypes";

export const fetchCareers = () => (dispatch) => {
  dispatch({
    type: FETCH_CAREERS_CONTENT,
    payload: null
  });
  http
    .get("careers")
    .then(({ data }) => {
      dispatch({
        type: FETCH_CAREERS_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CAREERS_CONTENT_FAILED,
        payload: error
      });
    });
};
