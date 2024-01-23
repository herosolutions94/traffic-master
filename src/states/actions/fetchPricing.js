import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_PRICING_CONTENT,
  FETCH_PRICING_CONTENT_SUCCESS,
  FETCH_PRICING_CONTENT_FAILED
} from "./actionTypes";

export const fetchPricing = () => (dispatch) => {
  dispatch({
    type: FETCH_PRICING_CONTENT,
    payload: null
  });
  http
    .post(
      "pricing",
      helpers.doObjToFormData({
        site_lang: localStorage.getItem("site_lang"),
        authToken: localStorage.getItem("authToken")
      })
  ) 
    .then(({ data }) => {
      dispatch({
        type: FETCH_PRICING_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PRICING_CONTENT_FAILED,
        payload: error
      });
    });
};
