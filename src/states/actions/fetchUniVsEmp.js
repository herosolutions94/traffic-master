import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../utils/siteSettings";
import Text from "../../components/common/Text";

import {
  FETCH_UNI_VS_EMP_CONTENT,
  FETCH_UNI_VS_EMP_CONTENT_SUCCESS,
  FETCH_UNI_VS_EMP_CONTENT_FAILED
} from "./actionTypes";

export const fetchUniVsEmp = () => (dispatch) => {
  dispatch({
    type: FETCH_UNI_VS_EMP_CONTENT,
    payload: null
  });
  http
    .get("uni-vs-emp")
    .then(({ data }) => {
      dispatch({
        type: FETCH_UNI_VS_EMP_CONTENT_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_UNI_VS_EMP_CONTENT_FAILED,
        payload: error
      });
    });
};
