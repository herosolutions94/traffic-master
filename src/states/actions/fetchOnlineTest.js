import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_ONLINE_TEST_CONTENT,
  FETCH_ONLINE_TEST_CONTENT_SUCCESS,
  FETCH_ONLINE_TEST_CONTENT_FAILED
} from "./actionTypes";

export const fetchOnlineTest = () => (dispatch) => {
  dispatch({
    type: FETCH_ONLINE_TEST_CONTENT,
    payload: null
  });
  http
    .get("online-test")
    .then(({ data }) => {
      dispatch({
        type: FETCH_ONLINE_TEST_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ONLINE_TEST_CONTENT_FAILED,
        payload: error
      });
    });
};
