import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_ONLINE_TEST_CATEGORIES_CONTENT,
  FETCH_ONLINE_TEST_CATEGORIES_CONTENT_SUCCESS,
  FETCH_ONLINE_TEST_CATEGORIES_CONTENT_FAILED
} from "./actionTypes";

export const fetchTestCategories = (post) => (dispatch) => {
  dispatch({
    type: FETCH_ONLINE_TEST_CATEGORIES_CONTENT,
    payload: null
  });
  http
    .post("online-test-categories", helpers.doObjToFormData(post))
    .then(({ data }) => {
      dispatch({
        type: FETCH_ONLINE_TEST_CATEGORIES_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ONLINE_TEST_CATEGORIES_CONTENT_FAILED,
        payload: error
      });
    });
};
