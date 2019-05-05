import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Category } from "../../types";
import Covers, { Cover } from "./Covers";

function getCovers(categories: Category[]): Cover[] {
  return categories.map(category => ({
    id: category.id,
    image:
      category.icons && category.icons.length
        ? category.icons[0].url
        : undefined,
    title: category.name
  }));
}

interface Props extends RouteComponentProps {
  categories: Category[];
}

function CategoryCovers({ history, categories }: Props) {
  function handleClick(categoryId: string) {
    history.push(
      `${process.env.PUBLIC_URL}/categories/${categoryId}/playlists`
    );
  }

  const covers = getCovers(categories);
  return <Covers covers={covers} onClick={handleClick} />;
}

export default withRouter(CategoryCovers);
