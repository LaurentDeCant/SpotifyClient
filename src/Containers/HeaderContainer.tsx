import { connect } from "react-redux";
import { State } from "../reducers";
import { isAuthorized } from "../reducers/authorization";
import { selectUserProfile } from "../reducers/userProfile";
import { getAuthorization } from "../actions/authorization";
import { getUserProfile } from "../actions/userProfile";
import Header from "../components/Header";

const mapStateToProps = (state: State) => ({
  isAuthorized: isAuthorized(state),
  userProfile: selectUserProfile(state)
});

const mapDispatchToProps = {
  getAuthorization: getAuthorization,
  getUserProfile: getUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
