import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";

import {
  FETCH_EMPLOYER_JOBS,
  FETCH_EMPLOYER_JOBS_SUCCESS,
  FETCH_EMPLOYER_JOBS_FAILED,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILED,
  UPDATE_JOB,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILED,
  APPLY_ON_JOB,
  APPLY_ON_JOB_SUCCESS,
  APPLY_ON_JOB_FAILED,
} from "./actionTypes";

export const fetchJobs = () => (dispatch) => {
  dispatch({
    type: FETCH_EMPLOYER_JOBS,
    payload: null,
  });
  http
    .post(
      "fetch-employer-jobs",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_EMPLOYER_JOBS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_EMPLOYER_JOBS_FAILED,
        payload: error,
      });
    });
};

export const deleteJob = (jobId) => (dispatch) => {
  dispatch({
    type: DELETE_JOB,
    payload: null,
  });
  http
    .post(
      "delete-job",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        job_id: jobId,
      })
    )
    .then(({ data }) => {
      if (data.status) {
        toast.success("You have successfully deleted the job!", TOAST_SETTINGS);
        dispatch({
          type: DELETE_JOB_SUCCESS,
          payload: data,
        });
      } else {
        toast.error("Something went wrong, please try again!", TOAST_SETTINGS);
        dispatch({
          type: DELETE_JOB_FAILED,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_JOB_FAILED,
        payload: error,
      });
    });
};

export const updateJob = (jobId, jobData) => (dispatch) => {
  jobData = { ...jobData, job_id: jobId };
  let file = jobData.company_logo;
  delete jobData.company_logo;
  jobData = helpers.doObjToFormData(jobData);
  if (typeof file !== "undefined") {
    jobData.append("company_logo", file);
  }

  dispatch({
    type: UPDATE_JOB,
    payload: null,
  });
  http
    .post("update-job", jobData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      if (data.status) {
        toast.success("You have successfully updated the job!", TOAST_SETTINGS);
        dispatch({
          type: UPDATE_JOB_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.href = "/employer/my-jobs";
        }, 2000);
      } else {
        toast.error("Something went wrong, please try again!", TOAST_SETTINGS);
        dispatch({
          type: UPDATE_JOB_FAILED,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_JOB_FAILED,
        payload: error,
      });
    });
};

export const applyOnJob = (jobId, memData) => (dispatch) => {
  memData = {
    ...memData,
    job_id: jobId,
    authToken: localStorage.getItem("authToken"),
  };
  let file = memData.resume;
  delete memData.resume;
  memData = helpers.doObjToFormData(memData);
  if (typeof file !== "undefined") {
    memData.append("resume", file);
  }

  dispatch({
    type: APPLY_ON_JOB,
    payload: null,
  });
  http
    .post("apply-on-job", memData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "You have successfully applied on the job!",
          TOAST_SETTINGS
        );
        dispatch({
          type: APPLY_ON_JOB_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.href = "/candidate/dashboard";
        }, 2000);
      } else if (data.msg) {
        toast.error(data.msg, TOAST_SETTINGS);
        dispatch({
          type: APPLY_ON_JOB_FAILED,
          payload: data,
        });
      } else {
        toast.error("Something went wrong, please try again!", TOAST_SETTINGS);
      }
    })
    .catch((error) => {
      toast.error("Something went wrong, please try again!", TOAST_SETTINGS);
      dispatch({
        type: APPLY_ON_JOB_FAILED,
        payload: error,
      });
    });
};
