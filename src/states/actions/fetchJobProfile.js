import http from "../../helpers/http";

import {
  FETCH_FETCH_JOB_CONTENT,
  FETCH_FETCH_JOB_CONTENT_SUCCESS,
  FETCH_FETCH_JOB_CONTENT_FAILED
} from "./actionTypes";

export const fetchJobProfile = () => (dispatch) => {
  dispatch({
    type: FETCH_FETCH_JOB_CONTENT,
    payload: null
  });
  http
    .get("job-profile")
    .then(({ data }) => {
      dispatch({
        type: FETCH_FETCH_JOB_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_FETCH_JOB_CONTENT_FAILED,
        payload: error
      });
    });
};
