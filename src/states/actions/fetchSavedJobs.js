 import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
    FETCH_SAVED_JOBS,
    FETCH_SAVED_JOBS_SUCCESS,
    FETCH_SAVED_JOBS_FAILED,
    DELETE_SAVED_JOB,
    DELETE_SAVED_JOB_SUCCESS,
    DELETE_SAVED_JOB_FAILED,
} from "./actionTypes";

export const fetchSavedJobs = () => (dispatch) => {
    dispatch({
        type: FETCH_SAVED_JOBS,
        payload: null,
    });
    http
        .post(
            "fetch-saved-jobs",
            helpers.doObjToFormData({
                authToken: localStorage.getItem("authToken"),
            })
        )
        .then(({ data }) => {
            dispatch({
                type: FETCH_SAVED_JOBS_SUCCESS,
                payload: data,
            });
        })
        .catch((error) => {
            dispatch({
                type: FETCH_SAVED_JOBS_FAILED,
                payload: error,
            });
        });
}

export const deleteSavedJob = (jobId) => (dispatch) => {
    dispatch({
        type: DELETE_SAVED_JOB,
        payload: null,
    });
    http
        .post(
            "delete-saved-job",
            helpers.doObjToFormData({
                authToken: localStorage.getItem("authToken"),
                job_id: jobId,
            })
        )
        .then(({ data }) => {
            if (data.status) {
                dispatch({
                    type: DELETE_SAVED_JOB_SUCCESS,
                    payload: data,
                });
            } else {
                dispatch({
                    type: DELETE_SAVED_JOB_FAILED,
                    payload: data,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: DELETE_SAVED_JOB_FAILED,
                payload: error,
            });
        });
}