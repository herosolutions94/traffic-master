import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_BLOGS_CONTENT,
  FETCH_BLOGS_CONTENT_SUCCESS,
  FETCH_BLOGS_CONTENT_FAILED,
  FETCH_BLOGS_SEARCH,
  FETCH_BLOGS_SEARCH_SUCCESS,
  FETCH_BLOGS_SEARCH_FAILED
} from "./actionTypes";

export const fetchBlogs = () => (dispatch) => {
  dispatch({
    type: FETCH_BLOGS_CONTENT,
    payload: null
  });
  http
    .post(
      "blogs",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_BLOGS_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_BLOGS_CONTENT_FAILED,
        payload: error
      });
    });
};

export const searchBlogsData = (post) => (dispatch) => {
  dispatch({
    type: FETCH_BLOGS_SEARCH,
    payload: null
  });
  http
    .post("fetch-blogs-data", helpers.doObjToFormData(post))
    .then(({ data }) => {
      dispatch({
        type: FETCH_BLOGS_SEARCH_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_BLOGS_SEARCH_FAILED,
        payload: error
      });
    });
};
