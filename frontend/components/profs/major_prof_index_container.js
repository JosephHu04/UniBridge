import { connect } from 'react-redux';
import { requestSchoolRatings } from '../../actions/school_rating_actions';
import MajorProfIndex from './major_prof_index';

const mSTP = (state, ownProps) => ({
  school: state.entities.schools[ownProps.match.params.schoolId],
  profs: Object.values(state.entities.profs),
});

const mDTP = (dispatch) => ({
  requestSchoolRatings: (schoolId) => dispatch(requestSchoolRatings(schoolId)),
});

export default connect(mSTP, mDTP)(MajorProfIndex);
