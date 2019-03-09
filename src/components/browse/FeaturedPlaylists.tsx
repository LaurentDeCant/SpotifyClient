import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Playlist } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectFeaturedPlaylists
} from "../../reducers/browse";
import { getFeaturedPlaylists } from "../../actions/browse";
import Covers from "./Covers";
import withLoader from "../withLoader";

interface Props extends RouteComponentProps {
  isLoading: boolean;
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
  isLoading: selectIsFetching(state),
  playlists: selectFeaturedPlaylists(state)
});

const mapDispatch = {
  getPlaylists: getFeaturedPlaylists
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(FeaturedPlaylists))
);
