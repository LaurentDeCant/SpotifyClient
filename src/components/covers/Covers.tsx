import React from "react";
import styled from "../../styles/styled";
import { Button, Icon, IconType, Image, Text } from "../core";

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

const length = 200;
const StyledButton = styled(Button)<{ type: CoverType }>`
  background: ${props => props.theme.background.light};
  ${props => props.type === CoverType.Round && "border-radius: 100px;"}
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  height: ${length}px;
  margin-bottom: 10px;
  width: ${length}px;
`;

const StyledImge = styled(Image)`
  height: 100%;
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  background: ${props => props.theme.background.light}  
  font-size: ${length / 2}px;
  height: ${length}px;
  line-height: ${length}px;
  width: 100%;
`;

const Title = styled(Text)`
  margin-bottom: 5px;
  text-align: center;
  width: ${length}px;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
  text-align: center;
  width: 200px;
`;

export interface Cover {
  id: string;
  image?: string;
  title: string;
  subTitle?: string;
}

export enum CoverType {
  Square = "SQUARE",
  Round = "ROUND"
}

function Cover({
  cover,
  type,
  onClick
}: {
  cover: Cover;
  type: CoverType;
  onClick: (coverId: string) => void;
}) {
  function handleClick() {
    onClick(cover.id);
  }

  return (
    <>
      <StyledButton onClick={handleClick} type={type}>
        {cover.image ? (
          <StyledImge source={cover.image} />
        ) : (
          <StyledIcon type={IconType.Person} />
        )}
      </StyledButton>
      <Title>{cover.title}</Title>
      {cover.subTitle && <SubTitle>{cover.subTitle}</SubTitle>}
    </>
  );
}

interface Props {
  covers: Cover[];
  type: CoverType;
  onClick: (id: string) => void;
}

function Covers({ covers, type, onClick }: Props) {
  return (
    <StyledList>
      {covers.map(cover => (
        <StyledItem key={cover.id}>
          <Cover cover={cover} type={type} onClick={onClick} />
        </StyledItem>
      ))}
    </StyledList>
  );
}

Covers.defaultProps = {
  type: CoverType.Square
};

export default Covers;
