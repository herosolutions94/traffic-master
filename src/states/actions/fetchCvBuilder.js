import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_CV_BUILDER_CONTENT,
  FETCH_CV_BUILDER_CONTENT_SUCCESS,
  FETCH_CV_BUILDER_CONTENT_FAILED,
  SAVE_CV,
  SAVE_CV_SUCCESS,
  SAVE_CV_FAILED,
  DOWNLOAD_CV,
  DOWNLOAD_CV_SUCCESS,
  DOWNLOAD_CV_FAILED
} from "./actionTypes";

export const fetchCvBuilder = () => (dispatch) => {
  dispatch({
    type: FETCH_CV_BUILDER_CONTENT,
    payload: null,
  });
  http
    .get("cv-builder")
    .then(({ data }) => {
      dispatch({
        type: FETCH_CV_BUILDER_CONTENT_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CV_BUILDER_CONTENT_FAILED,
        payload: error,
      });
    });
};

export const saveCV = (cvData) => (dispatch) => {
  dispatch({
    type: SAVE_CV,
    payload: null,
  });

  http
    .post(
      "cv-builder-page",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        cvData: JSON.stringify(cvData),
      })
    )
    .then(({ data }) => {
      if (data.status) {
        toast.success("You have sucessfully created your CV.", TOAST_SETTINGS);
        dispatch({
          type: SAVE_CV_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: SAVE_CV_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: SAVE_CV_FAILED,
        payload: error,
      });
    });
};
export const downloadCv = (cvData) => (dispatch) => {
  dispatch({
    type: DOWNLOAD_CV,
    payload: null,
  });

  http
    .post(
      "download-cv",
      helpers.doObjToFormData({
        authToken: localStorage.getItem("authToken"),
        cvData: JSON.stringify(cvData),
      })
    )
    .then(({ data }) => {
      if (data.status) {
        toast.success("You have sucessfully created your CV.", TOAST_SETTINGS);
        dispatch({
          type: DOWNLOAD_CV_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: DOWNLOAD_CV_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: DOWNLOAD_CV_FAILED,
        payload: error,
      });
    });
};
