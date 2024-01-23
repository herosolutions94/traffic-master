import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_JOBS_CONTENT,
  FETCH_JOBS_CONTENT_SUCCESS,
  FETCH_JOBS_CONTENT_FAILED,
  FETCH_JOBS_SEARCH,
  FETCH_JOBS_SEARCH_SUCCESS,
  FETCH_JOBS_SEARCH_FAILED,
  SAVE_JOB,
  SAVE_JOB_SUCCESS,
  SAVE_JOB_FAILED,
} from "./actionTypes";

export const fetchJobs = () => (dispatch) => {
  dispatch({
    type: FETCH_JOBS_CONTENT,
    payload: null,
  });
  http
    .post(
      "jobs",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOBS_CONTENT_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOBS_CONTENT_FAILED,
        payload: error,
      });
    });
};

export const searchJobsData = (post) => (dispatch) => {
  post = { ...post, authToken: localStorage.getItem("authToken") };
  dispatch({
    type: FETCH_JOBS_SEARCH,
    payload: null,
  });
  http
    .post("fetch-jobs-data", helpers.doObjToFormData(post))
    .then(({ data }) => {
      console.log(data)
      dispatch({
        type: FETCH_JOBS_SEARCH_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOBS_SEARCH_FAILED,
        payload: error,
      });
    });
};

export const saveJobAction = (formData) => (dispatch) => {
  formData = { ...formData, token: localStorage.getItem("authToken") };
  let file = formData.company_image;
  delete formData.company_image;
  formData = helpers.doObjToFormData(formData);
  if (typeof file != "undefined") formData.append("company_image", file[0]);

  dispatch({
    type: SAVE_JOB,
    payload: null,
  });
  http
    .post("save-job", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      if (data.status) {
        toast.success("Job saved successfully.", TOAST_SETTINGS);
        dispatch({
          type: SAVE_JOB_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/employer/my-jobs");
        }, 3000);
      } else {
        if (data.msg) {
          toast.error(<Text string={data.msg} parse={true} />, TOAST_SETTINGS);
          dispatch({
            type: SAVE_JOB_FAILED,
            payload: null,
          });
        }

        toast.error(data.message, TOAST_SETTINGS);
        dispatch({
          type: SAVE_JOB_FAILED,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SAVE_JOB_FAILED,
        payload: error,
      });
    });
};
