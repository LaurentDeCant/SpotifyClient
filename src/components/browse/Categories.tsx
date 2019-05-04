import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Category } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectCategories } from "../../reducers/browse";
import { getCategories } from "../../actions/browse";
import { getCategoryCovers } from "../../helpers/cover";
import Covers from "../Covers";
import withReloader from "../withReloader";

interface Props extends RouteComponentProps {
  isLoading: boolean;
  categories: Category[];
  getCategories: () => void;
}

function Categories({ history, categories, getCategories }: Props) {
  useEffect(getCategories, []);

  function handleClick(categoryId: string) {
    history.push(
      `${process.env.PUBLIC_URL}/categories/${categoryId}/playlists`
    );
  }

  const covers = getCategoryCovers(categories);
  return <Covers covers={covers} onClick={handleClick} />;
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
  )(withReloader(Categories))
);
