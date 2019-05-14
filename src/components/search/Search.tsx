import _ from "lodash";
import React, { useState, ChangeEvent, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { search } from "../../actions/search";
import { State } from "../../reducers";
import { selectIsLoading } from "../../reducers/loading";
import {
  selectAlbums,
  selectArtists,
  selectPlaylists
} from "../../reducers/search";
import Results from "./Results";
import { Heading } from "../core";

const StyledInput = styled.input`
  background: ${props => props.theme.background.light}
  border: none;
  border-radius: 25px;
  caret-color: ${props => props.theme.primaryLight}
  color: ${props => props.theme.foreground.default}
  font-size: ${props => props.theme.fontSize.extraLarge}
  font-weight: ${props => props.theme.fontWeight.light}
  height: 50px;
  margin: 0 0 25px 0;
  padding: 0 25px;
  width: calc(100% - 50px);
`;

interface Params {
  query: string;
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean;
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  search: (query: string) => void;
}

let debounced: (query: string) => void;

function Search({
  history,
  match,
  isLoading,
  albums,
  artists,
  playlists,
  search
}: Props) {
  const { query } = match.params;
  const [value, setValue] = useState(query || "");

  const effect = () => {
    search(value);
    debounced = _.debounce((query: string) => {
      history.push(`${process.env.PUBLIC_URL}/search${query && "/"}${query}`);
      search(query);
    }, 500);
  };
  useEffect(effect, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setValue(value);
    debounced(value);
  }

  const hasResults =
    isLoading || artists.length || albums.length || playlists.length;
  return (
    <>
      <StyledInput
        value={value}
        onChange={handleChange}
        placeholder="Search..."
        autoFocus
      />
      {query &&
        (hasResults ? (
          <Results
            isLoading={isLoading}
            artists={artists}
            albums={albums}
            playlists={playlists}
          />
        ) : (
          <Heading>No Results found for '{query}'.</Heading>
        ))}
    </>
  );
}

const mapState = (state: State) => ({
  isLoading: selectIsLoading(state),
  albums: selectAlbums(state),
  artists: selectArtists(state),
  playlists: selectPlaylists(state)
});

const mapDispatch = {
  search
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Search)
);
