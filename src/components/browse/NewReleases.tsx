import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Album } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectNewReleases } from "../../reducers/browse";
import { getNewReleases } from "../../actions/browse";
import { getAlbumCovers } from "../../helpers/cover";
import Covers from "../Covers";
import withReloader from "../withReloader";

interface Props extends RouteComponentProps {
  isLoading: boolean;
  albums: Album[];
  getAlbums: () => void;
}

function NewReleases({ history, albums, getAlbums }: Props) {
  useEffect(getAlbums, []);

  function handleClick(albumId: string) {
    history.push(`${process.env.PUBLIC_URL}/albums/${albumId}/tracks`);
  }

  const covers = getAlbumCovers(albums);
  return <Covers covers={covers} onClick={handleClick} />;
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  albums: selectNewReleases(state)
});

const mapDispatch = {
  getAlbums: getNewReleases
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withReloader(NewReleases))
);
