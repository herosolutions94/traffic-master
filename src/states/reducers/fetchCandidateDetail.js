import {
  FETCH_CANDIDATE_DETAIL,
  FETCH_CANDIDATE_DETAIL_SUCCESS,
  FETCH_CANDIDATE_DETAIL_FAILED,
} from "../actions/actionTypes";

const initialState = {
    isLoading: true,
    content: {},
    error: false
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_CANDIDATE_DETAIL:
            return {
                ...state,
                isLoading: true,
                content: {}
            };
            
        case FETCH_CANDIDATE_DETAIL_SUCCESS:
            return {
                ...state, 
                isLoading: false,
                content: payload
            };
        case FETCH_CANDIDATE_DETAIL_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        default:
            return state;
    }
}



