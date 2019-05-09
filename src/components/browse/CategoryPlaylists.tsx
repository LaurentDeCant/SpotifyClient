import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Category, DenormalizedPlaylist as Playlist } from "../../types";
import { getCategory, getCategoryPlaylists } from "../../actions/browse";
import { State } from "../../reducers";
import { selectCategory, selectCategoryPlaylists } from "../../reducers/browse";
import { Heading } from "../core";
import PlaylistCovers from "../covers/PlaylistCovers";
import withReloader from "../withReloader";

interface Params {
  categoryId: string;
}

interface Props extends RouteComponentProps<Params> {
  category?: Category;
  playlists: Playlist[];
  getCategory: (categoryId: string) => void;
  getPlaylists: (categoryId: string) => void;
}

function CategoryPlaylists({
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
  getCategory: (categoryId: string) => getCategory(categoryId),
  getPlaylists: (categoryId: string) => getCategoryPlaylists(categoryId)
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withReloader(CategoryPlaylists))
);
