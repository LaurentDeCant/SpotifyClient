import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Category, Playlist } from "../../types";
import { getCategory } from "../../actions/browse";
import { State } from "../../reducers";
import { selectCategory, selectCategoryPlaylists } from "../../reducers/browse";
import { Heading } from "../core";
import PlaylistCovers from "../covers/PlaylistCovers";
import withLoader from "../withLoader";

interface Params {
  categoryId: string;
}

interface Props extends RouteComponentProps<Params> {
  category?: Category;
  playlists: Playlist[];
  getCategory: (categoryId: string) => void;
}

function CategoryPlaylists({ match, category, playlists, getCategory }: Props) {
  const { categoryId } = match.params;

  useEffect(() => {
    getCategory(categoryId);
  }, [getCategory, categoryId]);

  return (
    <div>
      <Heading>{category && category.name}</Heading>
      <PlaylistCovers playlists={playlists} />
    </div>
  );
}

const mapState = (state: State, { match }: Props) => {
  const categoryId = match.params.categoryId;

  return {
    category: selectCategory(state, categoryId),
    playlists: selectCategoryPlaylists(state)
  };
};

const mapDispatch = {
  getCategory: (categoryId: string) => getCategory(categoryId)
};

export default withLoader(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(CategoryPlaylists)
  )
);
