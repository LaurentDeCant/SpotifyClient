import React, { useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import {
  selectIsFetching,
  Results,
  selectResults
} from "../../reducers/search";
import { search } from "../../actions/search";
import {
  getAlbumCovers,
  getArtistCovers,
  getPlaylistCovers
} from "../../helpers/cover";
import withLoader from "../withLoader";
import Covers from "../Covers";

const StyledInput = styled.input`
  background: ${props => props.theme.background.light}
  border: none;
  border-radius: 25px;
  caret-color: ${props => props.theme.primaryLight}
  color: ${props => props.theme.foreground.default}
  font-size: ${props => props.theme.font.size.extraLarge}
  font-weight: ${props => props.theme.font.weight.light}
  height: 50px;
  margin: 0 0 40px 0;
  padding: 0 25px;
  width: calc(100% - 50px);
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Header = styled.h2`
  font-size: ${props => props.theme.font.size.extraLarge}
  margin-bottom: 20px;
`;

interface Props {
  isLoading: boolean;
  results: Results;
  search: (query: string) => void;
}

function Search({ results: { albums, artists, playlists }, search }: Props) {
  const [query, setQuery] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: query } = event.target;
    setQuery(query);
    if (query) {
      search(query);
    }
  }

  const artistCovers = getArtistCovers(artists);
  const albumCovers = getAlbumCovers(albums);
  const playlistCovers = getPlaylistCovers(playlists);

  return (
    <div>
      <StyledInput
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <Section>
        <Header>Artists</Header>
        <Covers covers={artistCovers} />
      </Section>
      <Section>
        <Header>Albums</Header>
        <Covers covers={albumCovers} />
      </Section>
      <Section>
        <Header>Playlists</Header>
        <Covers covers={playlistCovers} />
      </Section>
    </div>
  );
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  results: selectResults(state)
});

const mapDispatch = {
  search
};

export default connect(
  mapState,
  mapDispatch
)(withLoader(Search));
