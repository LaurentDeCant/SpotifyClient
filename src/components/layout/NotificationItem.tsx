import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { deleteNotification } from "../../actions/notifications";
import { Notification } from "../../reducers/notifications";
import { Icon, IconType, RoundButton } from "../core";

const Wrapper = styled.li<{ isExiting: boolean }>`
  align-items: center;
  background: ${props => props.theme.color.primary};
  box-shadow: ${props => props.theme.shadow.high};
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  padding-left: ${props => props.theme.thickness.medium}px;
  padding-right: ${props => props.theme.thickness.small}px;
  position: relative;
  width: ${props =>
    props.theme.thickness.extraExtraLarge + props.theme.thickness.extraLarge}px;
  animation: ${props =>
    props.isExiting ? "exit 0.4s forwards" : "enter 0.4s forwards"};

  @keyframes enter {
    0% {
      height: 0;
      left: ${props => props.theme.thickness.small}px;
      margin-bottom: 0;
      padding-bottom: 0;
      padding-top: 0;
    }
    50% {
      height: ${props => props.theme.thickness.large}px;
      left: ${props => props.theme.thickness.small}px;
      margin-bottom: ${props => props.theme.thickness.small}px;
      padding-bottom: ${props => props.theme.thickness.small}px;
      padding-top: ${props => props.theme.thickness.small}px;
    }
    100% {
      height: ${props => props.theme.thickness.large}px;
      left: -${props => props.theme.thickness.extraExtraLarge + props.theme.thickness.extraLarge + props.theme.thickness.medium}px;
      margin-bottom: ${props => props.theme.thickness.small}px;
      padding-bottom: ${props => props.theme.thickness.small}px;
      padding-top: ${props => props.theme.thickness.small}px;
    }
  }

  @keyframes exit {
    0% {
      height: ${props => props.theme.thickness.large}px;
      left: -${props => props.theme.thickness.extraExtraLarge + props.theme.thickness.extraLarge + props.theme.thickness.medium}px;
      margin-bottom: ${props => props.theme.thickness.small}px;
      padding-bottom: ${props => props.theme.thickness.small}px;
      padding-top: ${props => props.theme.thickness.small}px;
    }
    50% {
      height: ${props => props.theme.thickness.large}px;
      left: ${props => props.theme.thickness.small}px;
      margin-bottom: ${props => props.theme.thickness.small}px;
      padding-bottom: ${props => props.theme.thickness.small}px;
      padding-top: ${props => props.theme.thickness.small}px;
    }
    100% {
      height: 0;
      left: ${props => props.theme.thickness.small}px;
      margin-bottom: 0;
      padding-bottom: 0;
      padding-top: 0;
    }
  }
`;

const DoneIcon = styled(Icon).attrs(() => ({
  type: IconType.Done
}))`
  color: ${props => props.theme.onPrimary.primary};
  margin-right: ${props => props.theme.thickness.small}px;
`;

const Text = styled.span`
  color: ${props => props.theme.onPrimary.primary};
  flex-grow: 1;
`;

const ClearButton = styled(RoundButton).attrs(() => ({
  onPrimary: true,
  iconType: IconType.Clear
}))`
  justify-self: flex-end;
`;

interface Props {
  notification: Notification;
  deleteNotification: (notificationId: string) => void;
}

function NotificationItem({ notification, deleteNotification }: Props) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      exit();
    }, 4000);
  });

  function exit() {
    setIsExiting(true);
    setTimeout(() => {
      deleteNotification(notification.id);
    }, 400);
  }

  return (
    <Wrapper isExiting={isExiting}>
      <DoneIcon />
      <Text>{notification.message}</Text>
      <ClearButton onClick={exit} />
    </Wrapper>
  );
}

const mapDispatch = {
  deleteNotification
};

export default connect(
  null,
  mapDispatch
)(NotificationItem);
