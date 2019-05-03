import React, { useState, useEffect, ChangeEvent } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { search } from "../../actions/search";

const StyledInput = styled.input`
  background: ${props => props.theme.background.light}
  border: none;
  border-radius: 25px;
  caret-color: ${props => props.theme.primaryLight}
  color: ${props => props.theme.foreground.default}
  font-size: ${props => props.theme.font.size.extraLarge}
  font-weight: ${props => props.theme.font.weight.light}
  height: 50px;
  margin: 0;
  padding: 0 25px;
  width: calc(100% - 50px);
`;

interface Props {
  search: (query: string) => void;
}

function Search({ search }: Props) {
  const [query, setQuery] = useState("");

  function trySearch() {
    if (query) {
      search(query);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: query } = event.target;
    setQuery(query);
    useEffect(trySearch);
  }

  return (
    <div>
      <StyledInput value={query} onChange={handleChange} />
    </div>
  );
}

const mapState = () => ({});

const mapDispatch = {
  search
};

export default connect(
  mapState,
  mapDispatch
)(Search);
