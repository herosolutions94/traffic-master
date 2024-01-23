import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
    SAVE_LIKE_JOB,
    SAVE_LIKE_JOB_SUCCESS,
    SAVE_LIKE_JOB_FAILED,
} from "./actionTypes";

export const saveLikeJob = (jobId) => (dispatch) => {
    dispatch({
        type: SAVE_LIKE_JOB,
        payload: null,
    });
    http
        .post("save-like-job",
            helpers.doObjToFormData({
                authToken: localStorage.getItem("authToken"),
                job_id: jobId,
            })
        )
        .then(({ data }) => {
        if (data.status) {
            toast.success(data.message, TOAST_SETTINGS);
            dispatch({
            type: SAVE_LIKE_JOB_SUCCESS,
            payload: data,
            });
        } else {
            toast.error(<Text string={data.message} parse={true} />, TOAST_SETTINGS);
            dispatch({
                type: SAVE_LIKE_JOB_FAILED,
                payload: null,
            });
        }
        })
        .catch((error) => {
        toast.error("Something went wrong!", TOAST_SETTINGS);
        dispatch({
            type: SAVE_LIKE_JOB_FAILED,
            payload: error,
        });
    });
};
    
