import React, { Component } from "react";
import { connect } from "react-redux";
import { Playlist } from "../../types/browse";
import { State } from "../../reducers";
import { selectFeaturedPlaylists } from "../../reducers/browse";
import { getFeaturedPlaylists } from "../../actions/browse";
import Tiles from "./Tiles";

interface Props {
  featuredPlaylists: Playlist[];
  getFeaturedPlaylists: () => void;
}

class FeaturedPlaylists extends Component<Props> {
  componentDidMount() {
    this.props.getFeaturedPlaylists();
  }

  render() {
    const { featuredPlaylists } = this.props;
    const items = featuredPlaylists.map(featuredPlaylist => ({
      id: featuredPlaylist.id,
      image: featuredPlaylist.images[0].url,
      label: featuredPlaylist.name
    }));

    return <Tiles items={items} />;
  }
}

const mapState = (state: State) => ({
  featuredPlaylists: selectFeaturedPlaylists(state)
});

const mapDispatch = {
  getFeaturedPlaylists: getFeaturedPlaylists
};

export default connect(
  mapState,
  mapDispatch
)(FeaturedPlaylists);
