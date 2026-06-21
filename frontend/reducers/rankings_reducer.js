import { RECEIVE_RANKINGS, RANKINGS_LOADING } from '../actions/ranking_actions';

const rankingsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_RANKINGS:
            return action.rankings || [];
        default:
            return state;
    }
};

export default rankingsReducer;

export const rankingsLoadingReducer = (state = true, action) => {
    switch (action.type) {
        case RANKINGS_LOADING:
            return true;
        case RECEIVE_RANKINGS:
            return false;
        default:
            return state;
    }
};
