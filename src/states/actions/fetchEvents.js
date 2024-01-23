import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_EVENTS_CONTENT,
  FETCH_EVENTS_CONTENT_SUCCESS,
  FETCH_EVENTS_CONTENT_FAILED,
  FETCH_EVENTS_SEARCH,
  FETCH_EVENTS_SEARCH_SUCCESS,
  FETCH_EVENTS_SEARCH_FAILED
} from "./actionTypes";

export const fetchEvents = () => (dispatch) => {
  dispatch({
    type: FETCH_EVENTS_CONTENT,
    payload: null
  });
  http
    .get("events")
    .then(({ data }) => {
      dispatch({
        type: FETCH_EVENTS_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_EVENTS_CONTENT_FAILED,
        payload: error
      });
    });
};

export const searchEvents = (post) => (dispatch) => {
  // post = { ...post, authToken: localStorage.getItem("authToken") };
  dispatch({
    type: FETCH_EVENTS_SEARCH,
    payload: null
  });
  http
    .post("fetch-events-data", helpers.doObjToFormData(post))
    .then(({ data }) => {
      dispatch({
        type: FETCH_EVENTS_SEARCH_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_EVENTS_SEARCH_FAILED,
        payload: error
      });
    });
};
