import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_BLOG_DETAIL_CONTENT,
  FETCH_BLOG_DETAIL_CONTENT_SUCCESS,
  FETCH_BLOG_DETAIL_CONTENT_FAILED
} from "./actionTypes";

export const fetchBlogDetail = (post) => (dispatch) => {
  dispatch({
    type: FETCH_BLOG_DETAIL_CONTENT,
    payload: null
  });
  http
    .post(
      "blog-detail",
      helpers.doObjToFormData({
        ...post,
        site_lang: localStorage.getItem("site_lang")
      })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_BLOG_DETAIL_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_BLOG_DETAIL_CONTENT_FAILED,
        payload: error
      });
    });
};
