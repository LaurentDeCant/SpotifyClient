import React from "react";
import styled from "../../styles/styled";
import { Image, Text } from "../core";
import ButtonBase from "../core/ButtonBase";
import { ImageShape } from "../core/Image";

const StyledList = styled.ul`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -12.5px;
`;

function splitWidth(times: number) {
  return `calc((100% - ${times * 25}px) / ${times})`;
}

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.thickness.small}px;
  width: ${splitWidth(2)};

  @media (min-width: ${({ theme }) => theme.breakpoints.extraSmall}px) {
    width: ${splitWidth(3)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.small}px) {
    width: ${splitWidth(6)};
  }
`;

const StyledButton = styled(ButtonBase)<{ type: ImageShape }>`
  background: ${props => props.theme.background.light};
  ${props => props.type === ImageShape.Round && "border-radius: 50%;"}
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: ${props => props.theme.thickness.small}px;
  padding-top: 100%;
  position: relative;
  width: 100%;
`;

const StyledImge = styled(Image)`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.fontSize.medium};
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
  text-align: center;
  width: 100%;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.light};
  text-align: center;
  width: 100%;
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
        <StyledImge source={cover.image} />
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
