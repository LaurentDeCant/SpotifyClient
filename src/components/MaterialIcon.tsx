import React, { Props } from "react";

interface OwnProps extends Props<void> {
  className?: string;
}

const MaterialIcon = (props: OwnProps) => {
  const { children, className } = props;

  return <i className={`material-icons ${className}`}>{children}</i>;
};

export default MaterialIcon;
