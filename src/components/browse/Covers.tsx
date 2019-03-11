import React, { Component } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -10px;
`;

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const Button = styled.button`
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;

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

const Title = styled.span`
  margin-bottom: 5px;
  text-align: center;
  width: 200px;
`;

const Author = styled.span`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
`;

interface Props {
  items: {
    id: string;
    image: string;
    title: string;
    author?: string;
  }[];
  onClick: (id: string) => void;
}

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
            </Button>
            <Title>{item.title}</Title>
            {item.author && <Author>{item.author}</Author>}
          </StyledItem>
        ))}
      </StyledList>
    );
  }
}

export default Covers;
