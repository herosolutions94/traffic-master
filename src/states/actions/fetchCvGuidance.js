import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_CV_GUIDANCE_CONTENT,
  FETCH_CV_GUIDANCE_CONTENT_SUCCESS,
  FETCH_CV_GUIDANCE_CONTENT_FAILED
} from "./actionTypes";

export const fetchCvGuidance = () => (dispatch) => {
  dispatch({
    type: FETCH_CV_GUIDANCE_CONTENT,
    payload: null
  });
  http
    .get("cv-guidance")
    .then(({ data }) => {
      dispatch({
        type: FETCH_CV_GUIDANCE_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CV_GUIDANCE_CONTENT_FAILED,
        payload: error
      });
    });
};
