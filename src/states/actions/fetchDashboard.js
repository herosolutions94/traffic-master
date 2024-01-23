import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_DASHBOARD,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILED,
  //   FETCH_JOBS_SEARCH,
  //   FETCH_JOBS_SEARCH_SUCCESS,
  //   FETCH_JOBS_SEARCH_FAILED,
  SAVE_JOB_STAT,
  SAVE_JOB_STAT_SUCCESS,
  SAVE_JOB_STAT_FAILED
} from "./actionTypes";

export const fetchDashboard = () => (dispatch) => {
  dispatch({
    type: FETCH_DASHBOARD,
    payload: null
  });
  http
    .post(
      "user/dashboard",
      helpers.doObjToFormData({ token: localStorage.getItem("authToken") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_DASHBOARD_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_DASHBOARD_FAILED,
        payload: error
      });
    });
};

// export const searchJobsData = (post) => (dispatch) => {
//   dispatch({
//     type: FETCH_JOBS_SEARCH,
//     payload: null
//   });
//   http
//     .post("fetch-jobs-data", helpers.doObjToFormData(post))
//     .then(({ data }) => {
//       dispatch({
//         type: FETCH_JOBS_SEARCH_SUCCESS,
//         payload: data
//       });
//     })
//     .catch((error) => {
//       dispatch({
//         type: FETCH_JOBS_SEARCH_FAILED,
//         payload: error
//       });
//     });
// };

export const saveJobStat = (formData) => (dispatch) => {
  if (localStorage.getItem("authToken")) {
    dispatch({
      type: SAVE_JOB_STAT,
      payload: null
    });
    formData = { ...formData, token: localStorage.getItem("authToken") };
    http
      .post("user/save-job-stat", helpers.doObjToFormData(formData))
      .then(({ data }) => {
        if (data.status) {
          toast.success("Saved Successfully.", TOAST_SETTINGS);
          dispatch({
            type: SAVE_JOB_STAT_SUCCESS,
            payload: data
          });
        } else {
          dispatch({
            type: SAVE_JOB_STAT_FAILED,
            payload: null
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SAVE_JOB_STAT_FAILED,
          payload: error
        });
      });
  } else {
    toast.error("Please signin first to save this job post.", TOAST_SETTINGS);
  }
};
