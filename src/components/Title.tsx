import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon, { IconType } from "./Icon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${props => props.theme.font.bold};
`;

const StyledIcon = styled(Icon)`
  margin-right: 15px;
`;

const Label = styled(Link)`
  font-size: 20px;
`;

const Title = () => {
  return (
    <Wrapper>
      <StyledIcon type={IconType.Wifi} />
      <Label to="/browse">Spotify</Label>
    </Wrapper>
  );
};

export default Title;
