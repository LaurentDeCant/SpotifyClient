import React, { Component } from "react";
import { connect } from "react-redux";
import { Category } from "../../types/browse";
import { State } from "../../reducers";
import { selectCategories } from "../../reducers/browse";
import { getCategories } from "../../actions/browse";
import Tiles from "./Tiles";

interface Props {
  categories: Category[];
  getCategories: () => void;
}

class Categories extends Component<Props> {
  componentDidMount() {
    this.props.getCategories();
  }

  handleClick() {}

  render() {
    const { categories } = this.props;
    const items = categories.map(category => ({
      id: category.id,
      image: category.icons[0].url,
      label: category.name
    }));

    return <Tiles items={items} />;
  }
}

const mapState = (state: State) => ({
  categories: selectCategories(state)
});

const mapDispatch = {
  getCategories: getCategories
};

export default connect(
  mapState,
  mapDispatch
)(Categories);
