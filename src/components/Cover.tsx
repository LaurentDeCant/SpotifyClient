import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Image = styled.img`
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  height: 300px;
  margin-bottom: 10px;
  width: 300px;
`;

const Title = styled.span`
  font-size: ${props => props.theme.font.size.large}
  margin-bottom: 5px;
`;

const Artist = styled.span`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
`;

interface Props {
  image: string;
  title: string;
  author: string;
}

class Cover extends Component<Props> {
  render() {
    const { image, title, author } = this.props;

    return (
      <Wrapper>
        <Image src={image} />
        <Title>{title}</Title>
        <Artist>{author}</Artist>
      </Wrapper>
    );
  }
}

export default Cover;
