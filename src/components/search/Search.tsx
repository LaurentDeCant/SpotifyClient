import React, { Component, ChangeEvent } from "react";
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

interface State {
  query: string;
}

class Search extends Component<Props, State> {
  state = {
    query: ""
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: query } = event.target;
    this.setState({ query }, this.search);
  };

  search() {
    const { search } = this.props;
    const { query } = this.state;
    if (query) {
      search(query);
    }
  }

  render() {
    const { query } = this.state;

    return (
      <div>
        <StyledInput value={query} onChange={this.handleChange} />
      </div>
    );
  }
}

const mapState = () => ({});

const mapDispatch = {
  search
};

export default connect(
  mapState,
  mapDispatch
)(Search);
