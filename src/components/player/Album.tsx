import React, { HTMLAttributes } from "react";
import styled from "../../styles/styled";
import { Image } from "../core";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyedImage = styled(Image)`
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  height: 100%;
  margin-right: 10px;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 5px;
`;

const Artist = styled.span`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
`;

interface Props extends HTMLAttributes<any> {
  image: string;
  name: string;
  artist: string;
}

function Album({ className, image, name, artist }: Props) {
  return (
    <Wrapper className={className}>
      <StyedImage source={image} />
      <Infos>
        <Title>{name}</Title>
        <Artist>{artist}</Artist>
      </Infos>
    </Wrapper>
  );
}

export default Album;
