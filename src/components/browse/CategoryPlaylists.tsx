import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Playlist } from "../../types/browse";
import { State } from "../../reducers";
import { selectCategoryPlaylist } from "../../reducers/browse";
import { getCategoryPlaylists } from "../../actions/browse";
import Tiles from "./Tiles";

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  playlists: Playlist[];
  getPlaylists: (id: string) => void;
}

class CategoryPlaylists extends Component<Props> {
  componentDidMount() {
    const { match } = this.props;
    this.props.getPlaylists(match.params.id);
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

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  return {
    playlists: selectCategoryPlaylist(state, match.params.id)
  };
};

const mapDispatch = {
  getPlaylists: (id: string) => getCategoryPlaylists(id)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(CategoryPlaylists)
);
