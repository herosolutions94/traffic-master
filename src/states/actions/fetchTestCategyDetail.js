import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_TEST_CATEGORY_DETAIL_CONTENT,
  FETCH_TEST_CATEGORY_DETAIL_CONTENT_SUCCESS,
  FETCH_TEST_CATEGORY_DETAIL_CONTENT_FAILED
} from "./actionTypes";

export const fetchTestCategyDetail = (post) => (dispatch) => {
  dispatch({
    type: FETCH_TEST_CATEGORY_DETAIL_CONTENT,
    payload: null
  });
  http
    .post("test-category-detail", helpers.doObjToFormData(post))
    .then(({ data }) => {
      dispatch({
        type: FETCH_TEST_CATEGORY_DETAIL_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TEST_CATEGORY_DETAIL_CONTENT_FAILED,
        payload: error
      });
    });
};
