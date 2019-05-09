import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Category } from "../../types";
import { getCategories } from "../../actions/browse";
import { State } from "../../reducers";
import { selectCategories } from "../../reducers/browse";
import CategoryCovers from "../covers/CategoryCovers";
import withReloader from "../withReloader";

interface Props {
  categories: Category[];
  getCategories: () => void;
}

function Categories({ categories, getCategories }: Props) {
  useEffect(getCategories, []);

  return <CategoryCovers categories={categories} />;
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
)(withReloader(Categories));
