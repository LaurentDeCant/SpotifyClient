import React from "react";
import styled from "../../styles/styled";
import { Button, Image, Text } from "../core";
import { ImageShape } from "../core/Image";
import { Cover } from "./types";

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)<{ shape: ImageShape }>`
  background: ${props => props.theme.background.tertiary};
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
  flex-shrink: 0;
  box-shadow: ${props => props.theme.shadow.middle};
  margin-bottom: ${props => props.theme.thickness.small}px;
  width: 100%;
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.fontSize.medium}px;
  text-align: center;
  width: 100%;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.onBackground.secondary};
  font-size: ${props => props.theme.fontSize.medium}px;
  font-weight: ${props => props.theme.fontWeight.light};
  margin-top: ${props => props.theme.thickness.extraSmall}px;
  text-align: center;
  width: 100%;
`;

interface Props {
  className?: string;
  cover: Cover;
  onClick: (coverId: string) => void;
}

function CoverItem({ className, cover, onClick }: Props) {
  function handleClick() {
    onClick(cover.id);
  }

  return (
    <Item className={className}>
      <StyledButton
        onClick={handleClick}
        shape={cover.imageShape || ImageShape.Square}
      >
        <Image source={cover.imageSource} />
      </StyledButton>
      <Title>{cover.title}</Title>
      {cover.subTitle && <SubTitle>{cover.subTitle}</SubTitle>}
    </Item>
  );
}

CoverItem.defaultProps = {
  onClick: () => {}
};

export default CoverItem;
