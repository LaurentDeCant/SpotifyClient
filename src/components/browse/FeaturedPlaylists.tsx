import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Playlist } from "../../types";
import { State } from "../../reducers";
import { selectFeaturedPlaylists } from "../../reducers/browse";
import { getFeaturedPlaylists } from "../../actions/browse";
import Covers from "./Covers";

interface Props extends RouteComponentProps {
  playlists: Playlist[];
  getPlaylists: () => void;
}

class FeaturedPlaylists extends Component<Props> {
  componentDidMount() {
    this.props.getPlaylists();
  }

  handleClick = (playlistId: string) => {
    const { history } = this.props;
    history.push(`/playlists/${playlistId}/tracks`);
  };

  render() {
    const { playlists } = this.props;
    const items = playlists.map(playlists => ({
      id: playlists.id,
      image: playlists.images[0].url,
      label: playlists.name
    }));

    return <Covers items={items} onClick={this.handleClick} />;
  }
}

const mapState = (state: State) => ({
  playlists: selectFeaturedPlaylists(state)
});

const mapDispatch = {
  getPlaylists: getFeaturedPlaylists
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(FeaturedPlaylists)
);
