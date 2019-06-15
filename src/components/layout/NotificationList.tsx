import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { State } from "../../reducers";
import {
  Notification,
  selectNotifications
} from "../../reducers/notifications";
import NotificationItem from "./NotificationItem";

const Wrapper = styled.div`
  overflow: visible;
  width: 0;
  z-index: 3;
`;

const List = styled.ul`
  padding-top: ${props => props.theme.thickness.medium}px;
  width: 0;
`;

interface Props {
  notifications: Notification[];
}

function NotificationList({
  className,
  notifications
}: Props & HTMLAttributes<HTMLElement>) {
  return (
    <Wrapper>
      <List className={className}>
        {notifications.map(notification => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </List>
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  notifications: selectNotifications(state)
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch
)(NotificationList);
