import React, { Component, HTMLAttributes } from "react";
import styled from "../../styles/styled";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const Image = styled.img`
  border-radius: 5px;
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

class Album extends Component<Props> {
  render() {
    const { className, image, name, artist } = this.props;

    return (
      <Wrapper className={className}>
        <Image src={image} />
        <Infos>
          <Title>{name}</Title>
          <Artist>{artist}</Artist>
        </Infos>
      </Wrapper>
    );
  }
}

export default Album;
