import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_FAQ_CONTENT,
  FETCH_FAQ_CONTENT_SUCCESS,
  FETCH_FAQ_CONTENT_FAILED
} from "./actionTypes";

export const fetchFaq = () => (dispatch) => {
  dispatch({
    type: FETCH_FAQ_CONTENT,
    payload: null
  });
  http
    .post(
      "faq",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_FAQ_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_FAQ_CONTENT_FAILED,
        payload: error
      });
    });
};
