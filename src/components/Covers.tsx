import React from "react";
import styled from "../styles/styled";
import Button from "./Button";
import Text from "./Text";

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

const StyledButton = styled(Button)<{ type: CoverType }>`
  ${props => props.type === CoverType.Round && "border-radius: 100px"};
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 10px;
`;

const Image = styled.img`
  height: 200px;
  object-fit: cover;
  width: 200px;
`;

const Title = styled(Text)`
  margin-bottom: 5px;
  text-align: center;
  width: 200px;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
`;

export enum CoverType {
  Square = "SQUARE",
  Round = "ROUND"
}

export interface Cover {
  id: string;
  image: string;
  title: string;
  subTitle?: string;
}

interface Props {
  covers: Cover[];
  type: CoverType;
  onClick?: (id: string) => void;
}

function Covers({ covers, type, onClick }: Props) {
  return (
    <StyledList>
      {covers.map(cover => (
        <StyledItem key={cover.id}>
          <StyledButton
            onClick={() => onClick && onClick(cover.id)}
            type={type}
          >
            <Image src={cover.image} />
          </StyledButton>
          <Title>{cover.title}</Title>
          {cover.subTitle && <SubTitle>{cover.subTitle}</SubTitle>}
        </StyledItem>
      ))}
    </StyledList>
  );
}

Covers.defaultProps = {
  type: CoverType.Square
};

export default Covers;
