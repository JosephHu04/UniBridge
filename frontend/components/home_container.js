import { connect } from 'react-redux';
import Home from './home';

const mSTP = state => ({
    current_user: state.session.current_user,
});

export default connect(mSTP, null)(Home);
