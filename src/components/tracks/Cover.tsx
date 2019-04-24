import React, { Component } from "react";
import styled from "../../styles/styled";
import Button from "../Button";

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
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background: ${props => props.theme.primary};
  border-radius: 20px;
  color: ${props => props.theme.foreground.default};
  padding: 10px 40px;

  &::before {
    border-radius: 20px;
  }
`;

interface Props {
  image: string;
  name: string;
  artist: string;
}

class Cover extends Component<Props> {
  render() {
    const { image, name, artist } = this.props;

    return (
      <Wrapper>
        <Image src={image} />
        <Title>{name}</Title>
        <Artist>{artist}</Artist>
        <StyledButton>Play</StyledButton>
      </Wrapper>
    );
  }
}

export default Cover;
