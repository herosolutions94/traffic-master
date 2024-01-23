import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_UK_CORPORATE_CONTENT,
  FETCH_UK_CORPORATE_CONTENT_SUCCESS,
  FETCH_UK_CORPORATE_CONTENT_FAILED
} from "./actionTypes";

export const fetchUkCorporate = () => (dispatch) => {
  dispatch({
    type: FETCH_UK_CORPORATE_CONTENT,
    payload: null
  });
  http
    .get("uk-corporate")
    .then(({ data }) => {
      dispatch({
        type: FETCH_UK_CORPORATE_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_UK_CORPORATE_CONTENT_FAILED,
        payload: error
      });
    });
};
