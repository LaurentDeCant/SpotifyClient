import React, { Props } from "react";

export enum IconType {
  Person = "person",
  Search = "search",
  ViewModule = "view_module",
  Wifi = "wifi"
}

interface OwnProps {
  type: IconType;
  className?: string;
}

const Icon = (props: OwnProps) => {
  const { type, className } = props;

  return <i className={`material-icons ${className}`}>{type}</i>;
};

export default Icon;
