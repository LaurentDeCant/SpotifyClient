import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MaterialIcon from "./MaterialIcon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(MaterialIcon)`
  margin-right: 10px;
`;

const Label = styled(Link)`
  font-size: 20px;
  font-weight: 800;
`;

const Title = () => {
  return (
    <Wrapper>
      <Icon>wifi</Icon>
      <Label to="/">Spotify</Label>
    </Wrapper>
  );
};

export default Title;
