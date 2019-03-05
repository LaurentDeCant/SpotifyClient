import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Category } from "../types/browse";
import { State } from "../reducers";
import { selectCategories } from "../reducers/browse";
import { getCategories } from "../actions/browse";

interface Props {
  categories: Category[];
  getCategories: () => void;
}

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const Categories = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

class Browse extends Component<Props> {
  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <Wrapper>
        <Categories>
          {categories.map(category => (
            <li>
              <img src={category.icons[0].url} />
            </li>
          ))}
        </Categories>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: State) => ({
  categories: selectCategories(state)
});

const mapDispatchToProps = {
  getCategories: getCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
