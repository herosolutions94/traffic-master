import {
    FETCH_ALL_MEMBERS,
    FETCH_ALL_MEMBERS_SUCCESS,
    FETCH_ALL_MEMBERS_FAILED,
} from "../actions/actionTypes";
 
const initialState = {
    isFetching: false,
    content: [],
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_MEMBERS:
            return {
                ...state,
                isFetching: true,
                content: [],
            };
        case FETCH_ALL_MEMBERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                content: action.payload,
            };
        case FETCH_ALL_MEMBERS_FAILED:
            return {
                ...state,
                isFetching: false,
                content: [],
                error: action.payload,
            };
        default:
            return state;
    }
}