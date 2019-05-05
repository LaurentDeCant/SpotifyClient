import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Category } from "../../types";
import { State } from "../../reducers";
import { selectIsFetching, selectCategories } from "../../reducers/browse";
import { getCategories } from "../../actions/browse";
import withReloader from "../withReloader";
import CategoryCovers from "../covers/CategoryCovers";

interface Props {
  isLoading: boolean;
  categories: Category[];
  getCategories: () => void;
}

function Categories({ categories, getCategories }: Props) {
  useEffect(getCategories, []);

  return <CategoryCovers categories={categories} />;
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  categories: selectCategories(state)
});

const mapDispatch = {
  getCategories: getCategories
};

export default connect(
  mapState,
  mapDispatch
)(withReloader(Categories));
