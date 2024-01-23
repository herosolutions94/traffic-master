import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  SAVE_EMAIL_FOR_NEWSLETTER,
  SAVE_EMAIL_FOR_NEWSLETTER_SUCCESS,
  SAVE_EMAIL_FOR_NEWSLETTER_FAILED,
} from "./actionTypes";

export const saveEmailForNewsletter = (email) => (dispatch) => {
  dispatch({
    type: SAVE_EMAIL_FOR_NEWSLETTER,
    payload: null,
  });
  http
    .post("save-email-for-newsletter", helpers.doObjToFormData(email))
    .then(({ data }) => {
      if (data.status) {
        toast.success("You email has been saved successfully.", TOAST_SETTINGS);
        dispatch({
          type: SAVE_EMAIL_FOR_NEWSLETTER_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(
            <Text string={data.validationErrors} parse={true} />,
            TOAST_SETTINGS
          );
          dispatch({
            type: SAVE_EMAIL_FOR_NEWSLETTER_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error("Something went wrong!", TOAST_SETTINGS);
      dispatch({
        type: SAVE_EMAIL_FOR_NEWSLETTER_FAILED,
        payload: error,
      });
    });
};
