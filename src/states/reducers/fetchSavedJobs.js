import {
    FETCH_SAVED_JOBS,
    FETCH_SAVED_JOBS_SUCCESS,
    FETCH_SAVED_JOBS_FAILED,
    DELETE_SAVED_JOB,
    DELETE_SAVED_JOB_SUCCESS,
    DELETE_SAVED_JOB_FAILED,
} from "../actions/actionTypes";
 
const initialState = {
    isLoading: true,
    isDeleting: false,
    content: {},
    error: false,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_SAVED_JOBS:
            return {
                ...state,
                isLoading: true,
                content: {},
            };
        case FETCH_SAVED_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                content: payload,
            };
        case FETCH_SAVED_JOBS_FAILED:
            return {
                ...state,
                isLoading: false,
                content: {},
                error: payload,
            };
        case DELETE_SAVED_JOB:
            return {
                ...state,
                isDeleting: true,
                content: {},
            };
        case DELETE_SAVED_JOB_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                content: payload,
            };
        case DELETE_SAVED_JOB_FAILED:
            return {
                ...state,
                isDeleting: false,
                content: {},
                error: payload,
            };
        default:
            return state;
    }
}