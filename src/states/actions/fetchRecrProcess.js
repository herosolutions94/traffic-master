import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_RECR_PROCESS_CONTENT,
  FETCH_RECR_PROCESS_CONTENT_SUCCESS,
  FETCH_RECR_PROCESS_CONTENT_FAILED
} from "./actionTypes";

export const fetchRecrProcess = () => (dispatch) => {
  dispatch({
    type: FETCH_RECR_PROCESS_CONTENT,
    payload: null
  });
  http
    .get("recruitment-process")
    .then(({ data }) => {
      dispatch({
        type: FETCH_RECR_PROCESS_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_RECR_PROCESS_CONTENT_FAILED,
        payload: error
      });
    });
};
