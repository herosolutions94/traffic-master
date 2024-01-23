import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_TESTIMONIALS_CONTENT,
  FETCH_TESTIMONIALS_CONTENT_SUCCESS,
  FETCH_TESTIMONIALS_CONTENT_FAILED
} from "./actionTypes";

export const fetchTestimonials = () => (dispatch) => {
  dispatch({
    type: FETCH_TESTIMONIALS_CONTENT,
    payload: null
  });
  http
    .get("testimonials")
    .then(({ data }) => {
      dispatch({
        type: FETCH_TESTIMONIALS_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TESTIMONIALS_CONTENT_FAILED,
        payload: error
      });
    });
};
