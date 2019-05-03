import React from "react";
import styled from "../../styles/styled";
import Button from "../Button";

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

const StyledButton = styled(Button)`
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 10px;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
`;

const Name = styled.span`
  margin-bottom: 5px;
  text-align: center;
  width: 200px;
`;

const Artist = styled.span`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
`;

interface Props {
  items: {
    id: string;
    image: string;
    title: string;
    artist?: string;
  }[];
  onClick: (id: string) => void;
}

function Covers(props: Props) {
  function handleClick(id: string) {
    const { onClick } = props;
    onClick && onClick(id);
  }

  const { items } = props;

  return (
    <StyledList>
      {items.map(item => (
        <StyledItem key={item.id}>
          <StyledButton onClick={() => handleClick(item.id)}>
            <Image src={item.image} />
          </StyledButton>
          <Name>{item.title}</Name>
          {item.artist && <Artist>{item.artist}</Artist>}
        </StyledItem>
      ))}
    </StyledList>
  );
}

export default Covers;
