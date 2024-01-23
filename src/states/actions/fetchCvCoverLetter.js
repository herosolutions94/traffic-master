import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_CV_COVER_LETTER_CONTENT,
  FETCH_CV_COVER_LETTER_CONTENT_SUCCESS,
  FETCH_CV_COVER_LETTER_CONTENT_FAILED
} from "./actionTypes";

export const fetchCvCoverLetter = () => (dispatch) => {
  dispatch({
    type: FETCH_CV_COVER_LETTER_CONTENT,
    payload: null
  });
  http
    .get("cv-cover-letter")
    .then(({ data }) => {
      dispatch({
        type: FETCH_CV_COVER_LETTER_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CV_COVER_LETTER_CONTENT_FAILED,
        payload: error
      });
    });
};
