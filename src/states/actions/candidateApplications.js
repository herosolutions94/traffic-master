import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";

import {
  FETCH_CANDIDATE_APPLICATIONS,
  FETCH_CANDIDATE_APPLICATIONS_SUCCESS,
  FETCH_CANDIDATE_APPLICATIONS_FAILED,
} from "./actionTypes";

export const fetchCandidateApplications = () => (dispatch) => {
  dispatch({
    type: FETCH_CANDIDATE_APPLICATIONS,
    payload: null,
  });
  http
    .post(
      "fetch-candidate-applications",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_CANDIDATE_APPLICATIONS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CANDIDATE_APPLICATIONS_FAILED,
        payload: error,
      });
    });
};
