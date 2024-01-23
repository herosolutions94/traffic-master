import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import { JOB_PUSH, JOB_PUSH_SUCCESS, JOB_PUSH_FAILED } from "./actionTypes";

export const jobPush = (jobId) => (dispatch) => {
  dispatch({
    type: JOB_PUSH,
    payload: null,
  });
  http
    .post(
      "job-push",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        job_id: jobId,
      })
    )
    .then(({ data }) => {
      if (data.status) {
        toast.success("You job has been pushed successfully.", TOAST_SETTINGS);
        dispatch({
          type: JOB_PUSH_SUCCESS,
          payload: data,
        });
      } else {
        if (data.msg) {
          toast.error(<Text string={data.msg} parse={true} />, TOAST_SETTINGS);
          dispatch({
            type: JOB_PUSH_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error("Something went wrong!", TOAST_SETTINGS);
      dispatch({
        type: JOB_PUSH_FAILED,
        payload: error,
      });
    });
};
