import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "../../styles/styled";
import Header from "./Header";
import Menu from "./Menu";
import Routes from "./Routes";
import NotificationList from "./NotificationList";
import Player from "../player/Player";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeader = styled(Header)`
  flex-shrink: 0;
  height: ${props => props.theme.thickness.large}px;
  padding: 0 ${props => props.theme.thickness.medium}px;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    padding: 0 ${props => props.theme.thickness.large}px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    flex-direction: row;
  }
`;

const StyledMenu = styled(Menu)`
  flex-shrink: 0;
`;

const StyledRoutes = styled(Routes)`
  flex-grow: 1;
`;

const StyledNotificationList = styled(NotificationList)`
  height: 100%;
  position: fixed;
  top: ${props => 2 * props.theme.thickness.large}px;
  right: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    top: ${props => props.theme.thickness.large}px;
  }
`;

const StyledPlayer = styled(Player)`
  flex-shrink: 0;
  height: ${props => props.theme.thickness.extraLarge}px;
`;

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  return (
    <Router>
      <Wrapper>
        <StyledHeader>{children}</StyledHeader>

        <Body>
          <StyledMenu />
          <StyledRoutes />
          <StyledNotificationList />
        </Body>

        <StyledPlayer />
      </Wrapper>
    </Router>
  );
}

export default App;
