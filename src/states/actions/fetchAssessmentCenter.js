import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_ASSESSMENT_CENTER_CONTENT,
  FETCH_ASSESSMENT_CENTER_CONTENT_SUCCESS,
  FETCH_ASSESSMENT_CENTER_CONTENT_FAILED
} from "./actionTypes";

export const fetchAssessmentCenter = () => (dispatch) => {
  dispatch({
    type: FETCH_ASSESSMENT_CENTER_CONTENT,
    payload: null
  });
  http
    .get("assessment-center")
    .then(({ data }) => {
      dispatch({
        type: FETCH_ASSESSMENT_CENTER_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ASSESSMENT_CENTER_CONTENT_FAILED,
        payload: error
      });
    });
};
