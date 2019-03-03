import React, { Component } from "react";
import UserProfile from "../types/UserProfile";
import { authorize } from "../helpers/authorization";

interface Props {
  isAuthorized: boolean;
  userProfile?: UserProfile;
  getAuthorization: () => void;
  getUserProfile: () => void;
}

class Header extends Component<Props> {
  componentDidUpdate() {
    const { isAuthorized, userProfile, getUserProfile } = this.props;
    if (isAuthorized && !userProfile) {
      getUserProfile();
    }
  }

  handleClick = async () => {
    await this.props.getAuthorization();
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
