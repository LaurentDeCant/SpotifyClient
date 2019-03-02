import { connect } from "react-redux";
import { State } from "../reducers";
import { selectUserProfile } from "../reducers/userProfile";
import { getUserProfile } from "../actions/userProfile";
import Header from "../components/Header";

const mapStateToProps = (state: State) => ({
  userProfile: selectUserProfile(state)
});

const mapDispatchToProps = {
  fetchUserProfile: getUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
