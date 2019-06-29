import { createSelector } from "reselect";
import { Album, Category, Playlist } from "../types";
import { State } from "../reducers";
import { selectPlaylists } from "./playlists";
import { selectAlbums } from "./albums";

export const selectCategories = createSelector(
  ({ browse }: State) => browse.categories,
  (categories: { [categoryId: string]: Category }) => Object.values(categories)
);

export function selectCategory(
  state: State,
  categoryId: string
): Category | undefined {
  return state.browse.categories[categoryId];
}

export function selectCategoryPlaylists(state: State): Playlist[] {
  return selectPlaylists(state)(state.browse.categoryPlaylistIds);
}

export function selectFeaturedPlaylists(state: State): Playlist[] {
  return selectPlaylists(state)(state.browse.featuredPlaylistIds);
}

export function selectNewReleases(state: State): Album[] {
  return selectAlbums(state)(state.browse.newReleaseIds);
}
