import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Category } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectCategories } from "../../reducers/browse";
import { getCategories } from "../../actions/browse";
import Covers from "./Covers";
import withLoader from "../withLoader";

interface Props extends RouteComponentProps {
  isLoading: boolean;
  categories: Category[];
  getCategories: () => void;
}

class Categories extends Component<Props> {
  componentDidMount() {
    this.props.getCategories();
  }

  handleClick = (categoryId: string) => {
    const { history } = this.props;
    history.push(
      `${process.env.PUBLIC_URL}/categories/${categoryId}/playlists`
    );
  };

  render() {
    const { categories } = this.props;
    const items = categories.map(category => ({
      id: category.id,
      image: category.icons[0].url,
      title: category.name
    }));

    return <Covers items={items} onClick={this.handleClick} />;
  }
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  categories: selectCategories(state)
});

const mapDispatch = {
  getCategories: getCategories
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(Categories))
);
