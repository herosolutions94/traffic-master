import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_HOW_IT_WORKS,
  FETCH_HOW_IT_WORKS_SUCCESS,
  FETCH_HOW_IT_WORKS_FAILED
} from "./actionTypes";

export const fetchHowItWorks = () => (dispatch) => {
  dispatch({
    type: FETCH_HOW_IT_WORKS,
    payload: null
  });
  http
    .post(
      "how-it-works",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_HOW_IT_WORKS_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_HOW_IT_WORKS_FAILED,
        payload: error
      });
    });
};
