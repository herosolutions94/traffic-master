import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_ABOUT_US_CONTENT,
  FETCH_ABOUT_US_CONTENT_SUCCESS,
  FETCH_ABOUT_US_CONTENT_FAILED
} from "./actionTypes";

export const fetchAboutUs = () => (dispatch) => {
  dispatch({
    type: FETCH_ABOUT_US_CONTENT,
    payload: null
  });
  http
    .post(
      "about-us",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_ABOUT_US_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ABOUT_US_CONTENT_FAILED,
        payload: error
      });
    });
};
