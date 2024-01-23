import http from "../../helpers/http";

import {
  FETCH_PARTNER_WITH_US_CONTENT,
  FETCH_PARTNER_WITH_US_CONTENT_SUCCESS,
  FETCH_PARTNER_WITH_US_CONTENT_FAILED
} from "./actionTypes";

export const fetchPartnerWithUs = () => (dispatch) => {
  dispatch({
    type: FETCH_PARTNER_WITH_US_CONTENT,
    payload: null
  });
  http
    .get("partner-with-us")
    .then(({ data }) => {
      dispatch({
        type: FETCH_PARTNER_WITH_US_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PARTNER_WITH_US_CONTENT_FAILED,
        payload: error
      });
    });
};
