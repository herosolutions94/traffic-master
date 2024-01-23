import http from "../../helpers/http";
import * as helpers from "../../helpers/helpers";

import {
    FETCH_ALL_MEMBERS,
    FETCH_ALL_MEMBERS_SUCCESS,
    FETCH_ALL_MEMBERS_FAILED,
} from "./actionTypes";

export const fetchAllMembers = () => (dispatch) => {
    dispatch({
        type: FETCH_ALL_MEMBERS,
        payload: null,
    });
    http
        .post(
            "fetch-all-members",
            helpers.doObjToFormData({
                authToken: localStorage.getItem("authToken"),
            })
        )
        .then(({ data }) => {
            dispatch({
                type: FETCH_ALL_MEMBERS_SUCCESS,
                payload: data,
            });
        })
        .catch((error) => {
            dispatch({
                type: FETCH_ALL_MEMBERS_FAILED,
                payload: error,
            });
        });
};