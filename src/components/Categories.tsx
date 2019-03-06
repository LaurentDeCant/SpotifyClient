import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Category } from "../types/browse";
import { State } from "../reducers";
import { selectCategories } from "../reducers/browse";
import { getCategories } from "../actions/browse";
import Tile from "./Tile";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  categories: Category[];
  getCategories: () => void;
}

const StyledList = styled.ul`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -10px;
`;

const StyledItem = styled.li`
  display: block;
  margin: 10px;
`;

class Categories extends Component<Props> {
  componentDidMount() {
    this.props.getCategories();
  }

  handleClick() {}

  render() {
    const { categories } = this.props;

    return (
      <StyledList>
        {categories.map(category => (
          <StyledItem key={category.id}>
            <Tile
              image={category.icons[0].url}
              text={category.name}
              onClick={this.handleClick}
            />
          </StyledItem>
        ))}
      </StyledList>
    );
  }
}

const mapStateToProps = (state: State) => ({
  categories: selectCategories(state)
});

const mapDispatchToProps = {
  getCategories: getCategories
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Categories)
);
