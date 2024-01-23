import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_JOB_PROFILE_DETAIL_CONTENT,
  FETCH_JOB_PROFILE_DETAIL_CONTENT_SUCCESS,
  FETCH_JOB_PROFILE_DETAIL_CONTENT_FAILED
} from "./actionTypes";

export const fetchJobProfileDetail = (post) => (dispatch) => {
  dispatch({
    type: FETCH_JOB_PROFILE_DETAIL_CONTENT,
    payload: null
  });
  http
    .post("job-profile-detail", helpers.doObjToFormData(post))
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOB_PROFILE_DETAIL_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_JOB_PROFILE_DETAIL_CONTENT_FAILED,
        payload: error
      });
    });
};
