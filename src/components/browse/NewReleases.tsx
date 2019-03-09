import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Album } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectNewReleases } from "../../reducers/browse";
import { getNewReleases } from "../../actions/browse";
import Covers from "./Covers";
import withLoader from "../withLoader";

interface Props extends RouteComponentProps {
  isLoading: boolean;
  albums: Album[];
  getAlbums: () => void;
}

class NewReleases extends Component<Props> {
  componentDidMount() {
    this.props.getAlbums();
  }

  handleClick = (albumId: string) => {
    const { history } = this.props;
    history.push(`/albums/${albumId}/tracks`);
  };

  render() {
    const { albums } = this.props;
    const items = albums.map(album => ({
      id: album.id,
      image: album.images[0].url,
      label: album.name
    }));

    return <Covers items={items} onClick={this.handleClick} />;
  }
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
  )(withLoader(NewReleases))
);
