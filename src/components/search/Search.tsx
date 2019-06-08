import _ from "lodash";
import React, { useState, ChangeEvent, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "../../styles/styled";
import { Album, Artist, Playlist } from "../../types";
import { search } from "../../actions/search";
import Recents from "./Recents";
import Results from "./Results";

const StyledInput = styled.input`
  background: ${props => props.theme.background.light};
  border: none;
  border-radius: ${props => props.theme.thickness.medium}px;
  caret-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.foreground.default};
  font-size: ${props => props.theme.fontSize.extraLarge}px;
  font-weight: ${props => props.theme.fontWeight.light};
  height: ${props => props.theme.thickness.large}px;
  margin: 0 0 ${props => props.theme.thickness.medium}px 0;
  padding: 0 ${props => props.theme.thickness.medium}px;
  width: calc(100% - ${props => props.theme.thickness.large}px);
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

function Search({ history, match, search }: Props) {
  const { query } = match.params;
  const [value, setValue] = useState(query || "");

  const effect = () => {
    debounced = _.debounce((query: string) => {
      history.push(`${process.env.PUBLIC_URL}/search${query && "/"}${query}`);
      search(query);
    }, 500);
    if (value) {
      search(value);
    }
  };
  useEffect(effect, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setValue(value);
    debounced(value);
  }

  return (
    <>
      <StyledInput
        value={value}
        onChange={handleChange}
        placeholder="Search..."
        autoFocus
      />
      {query ? <Results /> : <Recents />}
    </>
  );
}

const mapDispatch = {
  search
};

export default withRouter(
  connect(
    null,
    mapDispatch
  )(Search)
);
