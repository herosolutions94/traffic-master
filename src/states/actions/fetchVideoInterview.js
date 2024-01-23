import http from "../../helpers/http";

import {
  FETCH_VIDEO_INTERVIEW_CONTENT,
  FETCH_VIDEO_INTERVIEW_CONTENT_SUCCESS,
  FETCH_VIDEO_INTERVIEW_CONTENT_FAILED
} from "./actionTypes";

export const fetchVideoInterviewContent = () => (dispatch) => {
  dispatch({
    type: FETCH_VIDEO_INTERVIEW_CONTENT,
    payload: null
  });
  http
    .get("video-interview-content")
    .then(({ data }) => {
      dispatch({
        type: FETCH_VIDEO_INTERVIEW_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_VIDEO_INTERVIEW_CONTENT_FAILED,
        payload: error
      });
    });
};
