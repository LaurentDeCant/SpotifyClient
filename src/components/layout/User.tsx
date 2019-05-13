import React from "react";
import styled from "../../styles/styled";
import { UserProfile } from "../../types";
import { Icon, IconType } from "../core";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledIcon = styled(Icon)`
  margin-right: 12.5px;
`;

const User = (props: UserProfile) => {
  const { display_name } = props;

  return (
    <Wrapper>
      <StyledIcon type={IconType.Person} />
      <span>{display_name}</span>
    </Wrapper>
  );
};

export default User;
