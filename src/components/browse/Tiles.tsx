import React, { Component } from "react";
import styled from "styled-components";
import Tile from "./Tile";

interface Props {
  items: {
    id: string;
    image: string;
    label: string;
  }[];
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

class Tiles extends Component<Props> {
  handleClick() {}

  render() {
    const { items } = this.props;

    return (
      <StyledList>
        {items.map(item => (
          <StyledItem key={item.id}>
            <Tile
              image={item.image}
              label={item.label}
              onClick={this.handleClick}
            />
          </StyledItem>
        ))}
      </StyledList>
    );
  }
}

export default Tiles;
