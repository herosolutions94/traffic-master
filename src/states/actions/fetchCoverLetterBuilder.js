import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_COVER_LETTER_BUILDER_CONTENT,
  FETCH_COVER_LETTER_BUILDER_CONTENT_SUCCESS,
  FETCH_COVER_LETTER_BUILDER_CONTENT_FAILED,
  SAVE_COVER,
  SAVE_COVER_SUCCESS,
  SAVE_COVER_FAILED
} from "./actionTypes";

export const fetchCoverLetterBuilder = () => (dispatch) => {
  dispatch({
    type: FETCH_COVER_LETTER_BUILDER_CONTENT,
    payload: null
  });
  http
    .get("cover-letter-builder")
    .then(({ data }) => {
      dispatch({
        type: FETCH_COVER_LETTER_BUILDER_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_COVER_LETTER_BUILDER_CONTENT_FAILED,
        payload: error
      });
    });
};

export const saveCover = (post) => (dispatch) => {
  dispatch({
    type: SAVE_COVER,
    payload: null
  });
  http
    .post("cover-builder-page", helpers.doObjToFormData(post))
    .then(({ data }) => {
      if (data.status) {
        toast.success(
          "You have sucessfully created your Cover Letter.",
          TOAST_SETTINGS
        );
        dispatch({
          type: SAVE_COVER_SUCCESS,
          payload: data
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: SAVE_COVER_FAILED,
            payload: null
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: SAVE_COVER_FAILED,
        payload: error
      });
    });
};
