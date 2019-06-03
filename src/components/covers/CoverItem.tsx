import React from "react";
import styled from "../../styles/styled";
import { Image, Text } from "../core";
import ButtonBase from "../core/ButtonBase";
import { ImageShape } from "../core/Image";
import { Cover } from "./types";

const StyledButton = styled(ButtonBase)<{ shape: ImageShape }>`
  background: ${props => props.theme.background.light};
  ${props => props.shape === ImageShape.Round && "border-radius: 50%;"}
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

interface Props {
  cover: Cover;
  onClick: (coverId: string) => void;
}

function CoverItem({ cover, onClick }: Props) {
  function handleClick() {
    onClick(cover.id);
  }

  return (
    <>
      <StyledButton
        onClick={handleClick}
        shape={cover.imageShape || ImageShape.Square}
      >
        <StyledImge source={cover.imageSource} />
      </StyledButton>
      <Title>{cover.title}</Title>
      {cover.subTitle && <SubTitle>{cover.subTitle}</SubTitle>}
    </>
  );
}

CoverItem.defaultProps = {
  onClick: () => {}
};

export default CoverItem;
