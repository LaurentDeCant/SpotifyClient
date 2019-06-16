import React from "react";
import styled from "../../styles/styled";
import { UserProfile } from "../../types";
import { Icon, IconType, Text } from "../core";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.onPrimary.primary};
  margin-right: ${props => props.theme.thickness.small}px;
`;

const StyledText = styled(Text)`
  color: ${props => props.theme.onPrimary.primary};
`;

const User = (props: UserProfile) => {
  const { display_name } = props;

  return (
    <Wrapper>
      <StyledIcon type={IconType.Person} />
      <StyledText>{display_name}</StyledText>
    </Wrapper>
  );
};

export default User;
