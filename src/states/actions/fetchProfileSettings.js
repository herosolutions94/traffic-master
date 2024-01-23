import http from "../../helpers/http";
import httpBlob from "../../helpers/http-blob";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_PROFILE_SETTINGS,
  FETCH_PROFILE_SETTINGS_SUCCESS,
  FETCH_PROFILE_SETTINGS_FAILED,
  SAVE_PROFILE_SETTINGS,
  SAVE_PROFILE_SETTINGS_SUCCESS,
  SAVE_PROFILE_SETTINGS_FAILED,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "./actionTypes";

export const fetchProfileSettings = () => (dispatch) => {
  dispatch({
    type: FETCH_PROFILE_SETTINGS,
    payload: null,
  });
  http
    .post(
      "user/profile-settings",
      helpers.doObjToFormData({ token: localStorage.getItem("authToken") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_PROFILE_SETTINGS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PROFILE_SETTINGS_FAILED,
        payload: error,
      });
    });
};

export const saveProfileSettingsAction = (formData) => (dispatch) => {
  formData = { ...formData, authToken: localStorage.getItem("authToken") };
  let file = formData.profile;
  let document = formData.document;
  delete formData.profile;
  formData = helpers.doObjToFormData(formData);
  formData.append("profile", file[0]);
  formData.append("document", document[0]);

  dispatch({
    type: SAVE_PROFILE_SETTINGS,
    payload: null,
  });
  httpBlob
    .post("user/save-profile-settings", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success("Profile settings saved successfully.", TOAST_SETTINGS);
        dispatch({
          type: SAVE_PROFILE_SETTINGS_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: SAVE_PROFILE_SETTINGS_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: SAVE_PROFILE_SETTINGS_FAILED,
        payload: error,
      });
    });
};

export const changePasswordAction = (formData) => (dispatch) => {
  formData = { ...formData, authToken: localStorage.getItem("authToken") };
  dispatch({
    type: CHANGE_PASSWORD,
    payload: null,
  });
  http
    .post("user/change-password", helpers.doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success("Password changed successfully.", TOAST_SETTINGS);
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: CHANGE_PASSWORD_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
        payload: error,
      });
    });
};
