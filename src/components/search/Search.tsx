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
import withLoader from "../withLoader";

const StyledInput = styled.input`
  background: ${props => props.theme.background.light}
  border: none;
  border-radius: 25px;
  caret-color: ${props => props.theme.primaryLight}
  color: ${props => props.theme.foreground.default}
  font-size: ${props => props.theme.font.size.extraLarge}
  font-weight: ${props => props.theme.font.weight.light}
  height: 50px;
  margin: 0 0 30px 0;
  padding: 0 25px;
  width: calc(100% - 50px);
`;

const List = styled.ul`
  margin-bottom: 20px;
`;

const Header = styled.h2`
  font-size: ${props => props.theme.font.size.extraLarge}
  font-weight: ${props => props.theme.font.weight.light}
  margin-bottom: 10px;
`;

interface Props {
  isLoading: boolean;
  results: Results;
  search: (query: string) => void;
}

function Search({
  results: { albums, artists, playlists, tracks },
  search
}: Props) {
  const [query, setQuery] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: query } = event.target;
    setQuery(query);
    if (query) {
      search(query);
    }
  }

  function renderNames(items: Array<{ id: string; name: string }>) {
    return (
      <List>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </List>
    );
  }

  return (
    <div>
      <StyledInput
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <Header>Albums</Header>
      {renderNames(albums)}
      <Header>Artists</Header>
      {renderNames(artists)}
      <Header>Playlists</Header>
      {renderNames(playlists)}
      <Header>Tracks</Header>
      {renderNames(tracks)}
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
