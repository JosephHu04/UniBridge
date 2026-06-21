import { connect } from 'react-redux';
import RankingIndex from './ranking_index';
import { requestRankings } from '../../actions/ranking_actions';

const mSTP = state => ({
    rankings: state.entities.rankings,
    loading: state.entities.rankingsLoading,
});

const mDTP = dispatch => ({
    requestRankings: (params) => dispatch(requestRankings(params)),
});

export default connect(mSTP, mDTP)(RankingIndex);
