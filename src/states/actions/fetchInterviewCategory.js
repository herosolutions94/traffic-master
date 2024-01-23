import http from "../../helpers/http";
import httpBlob from "../../helpers/http-blob";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";

import {
  FETCH_INTERVIEW_CATEGORY_INSTRUCTION,
  FETCH_INTERVIEW_CATEGORY_INSTRUCTION_SUCCESS,
  FETCH_INTERVIEW_CATEGORY_INSTRUCTION_FAILED
} from "./actionTypes";

export const fetchInstruction = (post) => (dispatch) => {
  dispatch({
    type: FETCH_INTERVIEW_CATEGORY_INSTRUCTION,
    payload: null
  });
  http
    .post("interview-category", helpers.doObjToFormData(post))
    .then(({ data }) => {
      dispatch({
        type: FETCH_INTERVIEW_CATEGORY_INSTRUCTION_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_INTERVIEW_CATEGORY_INSTRUCTION_FAILED,
        payload: error
      });
    });
};
