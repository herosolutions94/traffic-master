import http from "../../helpers/http";
import httpBlob from "../../helpers/http-blob";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";

import {
  FETCH_CATEGORY_QUESTIONS,
  FETCH_CATEGORY_QUESTIONS_SUCCESS,
  FETCH_CATEGORY_QUESTIONS_FAILED,
  SAVE_INTERVIEW_VIDEO,
  SAVE_INTERVIEW_VIDEO_SUCCESS,
  SAVE_INTERVIEW_VIDEO_FAILED
} from "./actionTypes";

export const fetchCategoryQuestions = (post) => (dispatch) => {
  dispatch({
    type: FETCH_CATEGORY_QUESTIONS,
    payload: null
  });
  http
    .post("interview-category-question", helpers.doObjToFormData(post))
    .then(({ data }) => {
      dispatch({
        type: FETCH_CATEGORY_QUESTIONS_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CATEGORY_QUESTIONS_FAILED,
        payload: error
      });
    });
};

export const saveVideoStep = (formData) => (dispatch) => {
  //   console.log(formData);
  //   dispatch({
  //     type: SAVE_INTERVIEW_VIDEO,
  //     payload: null
  //   });
  httpBlob
    .post("save-interview-video", formData)
    .then(({ data }) => {
      if (data.status) {
        if (data.interview_session_id) {
          console.log(data.interview_session_id);
          localStorage.setItem(
            "interview_session_id",
            data.interview_session_id
          );
        }
      }
      dispatch({
        type: SAVE_INTERVIEW_VIDEO_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: SAVE_INTERVIEW_VIDEO_FAILED,
        payload: error
      });
    });
};
export const finishInterview = (formData) => (dispatch) => {
  //   console.log(formData);
  //   dispatch({
  //     type: SAVE_INTERVIEW_VIDEO,
  //     payload: null
  //   });
  httpBlob
    .post("save-interview", helpers.doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success("Video Interview Saved successfully.", TOAST_SETTINGS);
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 4000);
      }
      //   dispatch({
      //     type: SAVE_INTERVIEW_VIDEO_SUCCESS,
      //     payload: data
      //   });
    })
    .catch((error) => {
      dispatch({
        type: SAVE_INTERVIEW_VIDEO_FAILED,
        payload: error
      });
    });
};
