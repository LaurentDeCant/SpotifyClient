import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "../../styles/styled";
import { Category, Playlist } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectCategory,
  selectCategoryPlaylists
} from "../../reducers/browse";
import { getCategory, getCategoryPlaylists } from "../../actions/browse";
import Covers from "./Covers";
import withLoader from "../withLoader";

const Title = styled.h1`
  text-align: center;
  font-size: ${props => props.theme.font.size.extraExtraLarge};
  font-weight: ${props => props.theme.font.weight.bold};
  margin: 0 0 25px 0;
`;

interface Params {
  categoryId: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  category?: Category;
  playlists: Playlist[];
  getCategory: (categoryId: string) => void;
  getPlaylists: (categoryId: string) => void;
}

function CategoryPlaylists({
  history,
  match,
  category,
  playlists,
  getCategory,
  getPlaylists
}: Props) {
  useEffect(() => {
    const { categoryId } = match.params;
    if (!category) {
      getCategory(categoryId);
    }
    getPlaylists(categoryId);
  }, []);

  function handleClick(playlistId: string) {
    history.push(`${process.env.PUBLIC_URL}/playlists/${playlistId}/tracks`);
  }

  const items = playlists.map(playlists => ({
    id: playlists.id,
    image: playlists.images[0].url,
    title: playlists.name
  }));

  return (
    <div>
      <Title>{category && category.name}</Title>
      <Covers items={items} onClick={handleClick} />
    </div>
  );
}

const mapState = (state: State, ownProps: Props) => {
  const { match } = ownProps;
  const categoryId = match.params.categoryId;

  return {
    isLoading: selectIsFetching(state),
    category: selectCategory(state, categoryId),
    playlists: selectCategoryPlaylists(state)
  };
};

const mapDispatch = {
  getCategory: (categoryId: string) => getCategory(categoryId),
  getPlaylists: (categoryId: string) => getCategoryPlaylists(categoryId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(CategoryPlaylists))
);
