import React, { Component } from "react";
import UserProfile from "../types/UserProfile";
import { authorize } from "../services/authorization";

interface Props {
  userProfile?: UserProfile;
  fetchUserProfile: () => any;
}

class Header extends Component<Props> {
  handleClick = async () => {
    await authorize();
    this.props.fetchUserProfile();
  };

  render() {
    const { userProfile } = this.props;

    return (
      <div>
        <h1>Spotify Client</h1>

        {userProfile ? (
          <h2>{userProfile.display_name}</h2>
        ) : (
          <button onClick={this.handleClick}>Log In</button>
        )}
      </div>
    );
  }
}

export default Header;
