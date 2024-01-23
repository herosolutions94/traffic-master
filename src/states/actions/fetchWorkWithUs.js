import http from "../../helpers/http";

import {
  FETCH_WORK_WITH_US_CONTENT,
  FETCH_WORK_WITH_US_CONTENT_SUCCESS,
  FETCH_WORK_WITH_US_CONTENT_FAILED
} from "./actionTypes";

export const fetchWorkWithUs = () => (dispatch) => {
  dispatch({
    type: FETCH_WORK_WITH_US_CONTENT,
    payload: null
  });
  http
    .get("work-with-us")
    .then(({ data }) => {
      dispatch({
        type: FETCH_WORK_WITH_US_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_WORK_WITH_US_CONTENT_FAILED,
        payload: error
      });
    });
};
