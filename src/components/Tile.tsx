import React, { Component } from "react";
import styled from "styled-components";

interface Props {
  image: string;
  label: string;
  onClick: () => void;
}

const Button = styled.button`
  background: transparent;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  position: relative;

  &:hover::before {
    background: ${props => props.theme.background.hover};
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  &:active::before {
    background: ${props => props.theme.background.active};
  }
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
`;

const Label = styled.span`
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  color: ${props => props.theme.foreground.default};
  font-size: 20px;
  left: 50%;
  padding: 10px;
  position: absolute;
  transform: translate(-50%, 0);
  width: calc(100% - 20px);
`;

class Tile extends Component<Props> {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    const { image, label } = this.props;

    return (
      <Button onClick={this.handleClick}>
        <Image src={image} />
        <Label>{label}</Label>
      </Button>
    );
  }
}

export default Tile;
