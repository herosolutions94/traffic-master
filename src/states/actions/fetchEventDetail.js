import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
  FETCH_EVENT_DETAIL_CONTENT,
  FETCH_EVENT_DETAIL_CONTENT_SUCCESS,
  FETCH_EVENT_DETAIL_CONTENT_FAILED
} from "./actionTypes";

export const fetchEventDetail = (id) => (dispatch) => {
  dispatch({
    type: FETCH_EVENT_DETAIL_CONTENT,
    payload: null
  });
  http
    .post("event-detail", helpers.doObjToFormData({ id }))
    .then(({ data }) => {
      dispatch({
        type: FETCH_EVENT_DETAIL_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_EVENT_DETAIL_CONTENT_FAILED,
        payload: error
      });
    });
};
