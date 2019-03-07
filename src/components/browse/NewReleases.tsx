import React, { Component } from "react";
import { connect } from "react-redux";
import { Album } from "../../types/browse";
import { State } from "../../reducers";
import { selectNewReleases } from "../../reducers/browse";
import { getNewReleases } from "../../actions/browse";
import Tiles from "./Tiles";

interface Props {
  albums: Album[];
  getAlbums: () => void;
}

class NewReleases extends Component<Props> {
  componentDidMount() {
    this.props.getAlbums();
  }

  handleClick() {}

  render() {
    const { albums } = this.props;
    const items = albums.map(album => ({
      id: album.id,
      image: album.images[0].url,
      label: album.name
    }));

    return <Tiles items={items} />;
  }
}

const mapState = (state: State) => ({
  albums: selectNewReleases(state)
});

const mapDispatch = {
  getAlbums: getNewReleases
};

export default connect(
  mapState,
  mapDispatch
)(NewReleases);
