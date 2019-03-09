import React, { Component } from "react";
import styled from "styled-components";

interface Props {
  items: {
    id: string;
    image: string;
    label: string;
  }[];
  onClick: (id: string) => void;
}

const StyledList = styled.ul`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -10px;
`;

const StyledItem = styled.li`
  display: block;
  margin: 10px;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 5px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  overflow: hidden;
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
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  color: ${props => props.theme.foreground.default};
  font-size: 15px;
  left: 50%;
  padding: 10px;
  position: absolute;
  transform: translate(-50%, 0);
  width: calc(100% - 20px);
`;

class Covers extends Component<Props> {
  handleClick(id: string) {
    const { onClick } = this.props;
    onClick && onClick(id);
  }

  render() {
    const { items } = this.props;

    return (
      <StyledList>
        {items.map(item => (
          <StyledItem key={item.id}>
            <Button onClick={() => this.handleClick(item.id)}>
              <Image src={item.image} />
              <Label>{item.label}</Label>
            </Button>
          </StyledItem>
        ))}
      </StyledList>
    );
  }
}

export default Covers;
