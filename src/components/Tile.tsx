import React, { Component } from "react";
import styled from "styled-components";

interface Props {
  image: string;
  text: string;
  onClick: () => void;
}

const Button = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;

  &:hover::before {
    background: ${props => props.theme.background.hover};
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
  }

  &:active::before {
    background: ${props => props.theme.background.active};
  }
`;

const Image = styled.img`
  height: 250px;
  width: 250px;
`;

const Text = styled.span`
  bottom: 50px;
  color: ${props => props.theme.foreground.default}
  font-size: 20px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
`;

class Tile extends Component<Props> {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    const { image, text } = this.props;

    return (
      <Button onClick={this.handleClick}>
        <Image src={image} />
        <Text>{text}</Text>
      </Button>
    );
  }
}

export default Tile;
