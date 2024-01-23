import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_TERMS_AND_CONDITIONS_CONTENT,
  FETCH_TERMS_AND_CONDITIONS_CONTENT_SUCCESS,
  FETCH_TERMS_AND_CONDITIONS_CONTENT_FAILED
} from "./actionTypes";

export const fetchTerms = () => (dispatch) => {
  dispatch({
    type: FETCH_TERMS_AND_CONDITIONS_CONTENT,
    payload: null
  });
  http
    .post(
      "terms-and-conditions",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_TERMS_AND_CONDITIONS_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TERMS_AND_CONDITIONS_CONTENT_FAILED,
        payload: error
      });
    });
};
