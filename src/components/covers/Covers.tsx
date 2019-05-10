import React from "react";
import styled from "../../styles/styled";
import { Button, Icon, IconType, Image, Text } from "../core";
import { ImageShape } from "../core/Image";

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
const StyledButton = styled(Button)<{ type: ImageShape }>`
  background: ${props => props.theme.background.light};
  ${props => props.type === ImageShape.Round && "border-radius: 50%;"}
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
  background: ${props => props.theme.background.light};
  font-size: ${length / 2}px;
  height: ${length}px;
  line-height: ${length}px;
  width: 100%;
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.font.size.medium};
  margin-bottom: 5px;
  text-align: center;
  width: ${length}px;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  font-size: ${props => props.theme.font.size.medium};
  font-weight: ${props => props.theme.font.weight.light};
  text-align: center;
  width: ${length}px;
`;

export interface Cover {
  id: string;
  image?: string;
  title: string;
  subTitle?: string;
}

function Cover({
  cover,
  shape: type,
  onClick
}: {
  cover: Cover;
  shape: ImageShape;
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
  shape: ImageShape;
  onClick: (id: string) => void;
}

function Covers({ covers, shape, onClick }: Props) {
  return (
    <StyledList>
      {covers.map(cover => (
        <StyledItem key={cover.id}>
          <Cover cover={cover} shape={shape} onClick={onClick} />
        </StyledItem>
      ))}
    </StyledList>
  );
}

Covers.defaultProps = {
  shape: ImageShape.Square
};

export default Covers;
