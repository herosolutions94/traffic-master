import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_CANDIDATES_CONTENT,
  FETCH_CANDIDATES_CONTENT_SUCCESS,
  FETCH_CANDIDATES_CONTENT_FAILED,
  FETCH_CANDIDATE_DETAIL,
  FETCH_CANDIDATE_DETAIL_SUCCESS,
  FETCH_CANDIDATE_DETAIL_FAILED,
} from "./actionTypes";

export const fetchCandidates = () => (dispatch) => {
  dispatch({
    type: FETCH_CANDIDATES_CONTENT,
    payload: null
  });
  http
    .post(
      "candidates",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_CANDIDATES_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CANDIDATES_CONTENT_FAILED,
        payload: error
      });
    });
};
