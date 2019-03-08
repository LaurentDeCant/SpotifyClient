import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Category, Playlist } from "../../types";
import { State } from "../../reducers";
import { selectCategory, selectCategoryPlaylists } from "../../reducers/browse";
import { getCategoryPlaylists } from "../../actions/browse";
import Covers from "./Covers";

interface Params {
  categoryId: string;
}

const Title = styled.h1`
  text-align: center;
  font-size: ${props => props.theme.font.size.extraExtraLarge};
  font-weight: ${props => props.theme.font.weight.bold};
  margin: 0 0 25px 0;
`;

interface Props extends RouteComponentProps<Params> {
  category?: Category;
  playlists: Playlist[];
  getPlaylists: (categoryId: string) => void;
}

class CategoryPlaylists extends Component<Props> {
  componentDidMount() {
    const { getPlaylists, match } = this.props;
    getPlaylists(match.params.categoryId);
  }

  handleClick = (playlistId: string) => {
    const { history } = this.props;
    history.push(`/playlists/${playlistId}/tracks`);
  };

  render() {
    const { category, playlists } = this.props;
    const items = playlists.map(playlists => ({
      id: playlists.id,
      image: playlists.images[0].url,
      label: playlists.name
    }));

    return (
      <div>
        <Title>{category && category.name}</Title>
        <Covers items={items} onClick={this.handleClick} />
      </div>
    );
  }
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const categoryId = match.params.categoryId;
  return {
    category: selectCategory(state, categoryId),
    playlists: selectCategoryPlaylists(state)
  };
};

const mapDispatch = {
  getPlaylists: (categoryId: string) => getCategoryPlaylists(categoryId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(CategoryPlaylists)
);
