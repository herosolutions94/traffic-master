import {
    SAVE_LIKE_JOB, 
    SAVE_LIKE_JOB_SUCCESS,
    SAVE_LIKE_JOB_FAILED
} from "../actions/actionTypes";

const initialState = {
    isJobSaving: false,
    content: {},
    error: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_LIKE_JOB:
            return {
                ...state,
                isJobSaving: true,
                content: {},
            };
        case SAVE_LIKE_JOB_SUCCESS:
            return {
                ...state,
                isJobSaving: false,
                content: action.payload,
            };
        case SAVE_LIKE_JOB_FAILED:
            return {
                ...state,
                isJobSaving: false,
                content: {},
                error: action.payload,
            };
        default:
            return state;
    }
}