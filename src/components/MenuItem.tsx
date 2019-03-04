import React from "react";
import styled from "styled-components";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";

interface Props extends RouteComponentProps {
  exact?: boolean;
  icon: string;
  label: string;
  to: string;
}

const Link = styled(NavLink)`
  align-items: center;
  display: flex;
  height: 50px;
  padding: 0 50px;

  &.active {
    background: ${props => props.theme.backgroundLight};
    border-right: 5px solid ${props => props.theme.primary};
    padding-right: 45px;
  }
`;

const Icon = styled(MaterialIcon)`
  margin-right: 10px;
`;

const MenuItem = (props: Props) => {
  const { exact, icon, label, to } = props;

  return (
    <Link exact={exact} to={to}>
      <Icon>{icon}</Icon>
      <span>{label}</span>
    </Link>
  );
};

export default withRouter(MenuItem);
