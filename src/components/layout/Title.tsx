import React from "react";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Icon, IconType } from "../core";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.font.size.large};
  font-weight: ${props => props.theme.font.weight.bold};
`;

const StyledIcon = styled(Icon)`
  margin-right: 15px;
`;

const Title = () => {
  return (
    <Wrapper>
      <StyledIcon type={IconType.Wifi} />
      <Link to="/browse">Spotify</Link>
    </Wrapper>
  );
};

export default Title;
