import React, { Component } from "react";
import { connect } from "react-redux";
import { Playlist } from "../../types/browse";
import { State } from "../../reducers";
import { selectFeaturedPlaylists } from "../../reducers/browse";
import { getFeaturedPlaylists } from "../../actions/browse";
import Tiles from "./Tiles";

interface Props {
  playlists: Playlist[];
  getPlaylists: () => void;
}

class FeaturedPlaylists extends Component<Props> {
  componentDidMount() {
    this.props.getPlaylists();
  }

  render() {
    const { playlists } = this.props;
    const items = playlists.map(playlists => ({
      id: playlists.id,
      image: playlists.images[0].url,
      label: playlists.name
    }));

    return <Tiles items={items} />;
  }
}

const mapState = (state: State) => ({
  playlists: selectFeaturedPlaylists(state)
});

const mapDispatch = {
  getPlaylists: getFeaturedPlaylists
};

export default connect(
  mapState,
  mapDispatch
)(FeaturedPlaylists);
