import http from "../../helpers/http";

import {
  FETCH_CAREER_OPTIONS_CONTENT,
  FETCH_CAREER_OPTIONS_CONTENT_SUCCESS,
  FETCH_CAREER_OPTIONS_CONTENT_FAILED
} from "./actionTypes";

export const fetchCareerOptions = () => (dispatch) => {
  dispatch({
    type: FETCH_CAREER_OPTIONS_CONTENT,
    payload: null
  });
  http
    .get("career-options")
    .then(({ data }) => {
      dispatch({
        type: FETCH_CAREER_OPTIONS_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CAREER_OPTIONS_CONTENT_FAILED,
        payload: error
      });
    });
};
