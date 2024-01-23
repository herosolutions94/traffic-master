import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_INTERVIEW_CONTENT,
  FETCH_INTERVIEW_CONTENT_SUCCESS,
  FETCH_INTERVIEW_CONTENT_FAILED
} from "./actionTypes";

export const fetchInterview = () => (dispatch) => {
  dispatch({
    type: FETCH_INTERVIEW_CONTENT,
    payload: null
  });
  http
    .get("interview")
    .then(({ data }) => {
      dispatch({
        type: FETCH_INTERVIEW_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_INTERVIEW_CONTENT_FAILED,
        payload: error
      });
    });
};
