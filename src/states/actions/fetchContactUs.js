import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_CONTACT_US,
  FETCH_CONTACT_US_SUCCESS,
  FETCH_CONTACT_US_FAILED,
  SAVE_CONTACT_MESSAGE,
  SAVE_CONTACT_MESSAGE_SUCCESS,
  SAVE_CONTACT_MESSAGE_FAILED
} from "./actionTypes";

export const fetchContactUs = () => (dispatch) => {
  dispatch({
    type: FETCH_CONTACT_US,
    payload: null
  });
  http
    .post(
      "contact-us",
      helpers.doObjToFormData({ site_lang: localStorage.getItem("site_lang") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_CONTACT_US_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CONTACT_US_FAILED,
        payload: error
      });
    });
};

export const saveContact = (formData) => (dispatch) => {
  dispatch({
    type: SAVE_CONTACT_MESSAGE,
    payload: null
  });
  http
    .post("save-contact-message", helpers.doObjToFormData(formData))
    .then(({ data }) => {
      if (data.validationErrors) {
        toast.error(
          <Text string={data.validationErrors} parse={true} />,
          TOAST_SETTINGS
        );
      } else {
        toast.success("Message sent successfully.", TOAST_SETTINGS);
      }
      dispatch({
        type: SAVE_CONTACT_MESSAGE_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: SAVE_CONTACT_MESSAGE_FAILED,
        payload: error
      });
    });
};
