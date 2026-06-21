import * as RankingApiUtil from '../util/ranking_api_util';

export const RECEIVE_RANKINGS = 'RECEIVE_RANKINGS';
export const RANKINGS_LOADING = 'RANKINGS_LOADING';

const receiveRankings = (rankings) => ({
    type: RECEIVE_RANKINGS,
    rankings,
});

export const requestRankings = (params = {}) => dispatch => {
    dispatch({ type: RANKINGS_LOADING });
    return RankingApiUtil.fetchRankings(params)
        .then(data => dispatch(receiveRankings(data.rankings || data)))
        .fail(err => console.error('Failed to fetch rankings:', err));
};
