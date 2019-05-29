import React, { HTMLAttributes } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "../../styles/styled";
import { Recent } from "../../reducers/search";
import ButtonBase from "../core/ButtonBase";

const Button = styled(ButtonBase)`
  background: ${props => props.theme.background.light};
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.thickness.small}px
    ${props => props.theme.thickness.medium}px;
`;

const Name = styled.span`
  font-size: ${props => props.theme.fontSize.large};
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
`;

const Type = styled.span`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.fontWeight.light};
  text-transform: uppercase;
`;

interface Props extends RouteComponentProps {
  recent: Recent;
}

function RecentItem({
  className,
  history,
  recent
}: Props & HTMLAttributes<HTMLElement>) {
  function handleClick() {
    history.push(`${process.env.PUBLIC_URL}/${recent.type}/${recent.id}`);
  }

  return (
    <li className={className}>
      <Button onClick={handleClick}>
        <Name>{recent.name}</Name>
        <Type>{recent.type}</Type>
      </Button>
    </li>
  );
}

export default withRouter(RecentItem);
