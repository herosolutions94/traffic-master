import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
// import { toast } from "react-toastify";
// import { TOAST_SETTINGS } from "../../utils/siteSettings";
// import Text from "../../components/common/Text";

import {
  FETCH_CANDIDATE_DETAIL,
  FETCH_CANDIDATE_DETAIL_SUCCESS,
  FETCH_CANDIDATE_DETAIL_FAILED,
} from "./actionTypes";

export const fetchCandidateDetail = (id) => (dispatch) => {
  dispatch({
    type: FETCH_CANDIDATE_DETAIL,
    payload: null,
  });
  http
    .post(
      "fetch-candidate-detail",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        site_lang: localStorage.getItem("site_lang"),
        id,
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_CANDIDATE_DETAIL_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CANDIDATE_DETAIL_FAILED,
        payload: error,
      });
    });
};

