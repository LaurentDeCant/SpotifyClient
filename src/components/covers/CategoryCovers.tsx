import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Category } from "../../types";
import { Cover } from "./types";
import CoverList from "./CoverList";

interface Props extends RouteComponentProps {
  categories: Category[];
}

function CategoryCovers({ history, categories }: Props) {
  function handleClick(categoryId: string) {
    history.push(`${process.env.PUBLIC_URL}/category/${categoryId}`);
  }

  const covers = getCovers(categories);
  return <CoverList covers={covers} onClick={handleClick} />;
}

function getCovers(categories: Category[]): Cover[] {
  return categories.map(category => ({
    id: category.id,
    imageSource:
      category.icons && category.icons.length
        ? category.icons[0].url
        : undefined,
    title: category.name
  }));
}

export default withRouter(CategoryCovers);
