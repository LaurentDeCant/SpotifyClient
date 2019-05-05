import React, { useState, ChangeEvent, useEffect } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectAlbums,
  selectArtists,
  selectPlaylists
} from "../../reducers/search";
import { search } from "../../actions/search";
import Results from "./Results";
import debounce from "../../utils/function";

const StyledInput = styled.input`
  background: ${props => props.theme.background.light}
  border: none;
  border-radius: 25px;
  caret-color: ${props => props.theme.primaryLight}
  color: ${props => props.theme.foreground.default}
  font-size: ${props => props.theme.font.size.extraLarge}
  font-weight: ${props => props.theme.font.weight.light}
  height: 50px;
  margin: 0 0 50px 0;
  padding: 0 25px;
  width: calc(100% - 50px);
`;

interface Props {
  isLoading: boolean;
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  search: (query: string) => void;
}

let debounced: (query: string) => void;

function Search({ isLoading, albums, artists, playlists, search }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    debounced = debounce((query: string) => {
      if (query) {
        search(query);
      }
    });
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: query } = event.target;
    setQuery(query);
    debounced(query);
  }

  return (
    <>
      <StyledInput
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        autoFocus
      />
      <Results
        isLoading={isLoading}
        artists={artists}
        albums={albums}
        playlists={playlists}
      />
    </>
  );
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  albums: selectAlbums(state),
  artists: selectArtists(state),
  playlists: selectPlaylists(state)
});

const mapDispatch = {
  search
};

export default connect(
  mapState,
  mapDispatch
)(Search);
