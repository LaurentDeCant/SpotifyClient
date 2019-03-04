import React from "react";
import styled from "styled-components";
import UserProfile from "../types/UserProfile";
import MaterialIcon from "./MaterialIcon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(MaterialIcon)`
  margin-right: 10px;
`;

const User = (props: UserProfile) => {
  const { display_name } = props;

  return (
    <Wrapper>
      <Icon>face</Icon>
      <span>{display_name}</span>
    </Wrapper>
  );
};

export default User;
