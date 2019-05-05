import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Playlist } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectFeaturedPlaylists
} from "../../reducers/browse";
import { getFeaturedPlaylists } from "../../actions/browse";
import { convertPlaylists } from "../../helpers/cover";
import Covers from "../Covers";
import withReloader from "../withReloader";

interface Props extends RouteComponentProps {
  isLoading: boolean;
  playlists: Playlist[];
  getPlaylists: () => void;
}

function FeaturedPlaylists({ history, playlists, getPlaylists }: Props) {
  useEffect(getPlaylists, []);

  function handleClick(playlistId: string) {
    history.push(`${process.env.PUBLIC_URL}/playlists/${playlistId}/tracks`);
  }

  const covers = convertPlaylists(playlists);
  return <Covers covers={covers} onClick={handleClick} />;
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
  )(withReloader(FeaturedPlaylists))
);
