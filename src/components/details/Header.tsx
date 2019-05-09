import React from "react";
import styled from "../../styles/styled";
import { Button, Image, Text } from "../core";
import { ImageShape } from "../core/Image";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledImage = styled(Image)`
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  height: 300px;
  margin-bottom: 20px;
  width: 300px;
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.font.size.extraLarge};
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  display: inline-block;
  font-size: ${props => props.theme.font.size.large}
  font-weight: ${props => props.theme.font.weight.light};
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  background: ${props => props.theme.primary};
  border-radius: 20px;
  color: ${props => props.theme.foreground.default};
  margin-top: 20px;
  padding: 10px 40px;
  width: 120px;
`;

interface Props {
  imageSource: string;
  imageShape: ImageShape;
  title: string;
  subTitle?: string;
  canPlay: boolean;
  isPlaying: boolean;
  onToggle: () => void;
}

function Header({
  imageSource,
  imageShape,
  title,
  subTitle,
  canPlay,
  isPlaying,
  onToggle
}: Props) {
  function handleClick() {
    onToggle();
  }

  return (
    <Wrapper>
      <StyledImage source={imageSource} shape={imageShape} />
      <Title>{title}</Title>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <StyledButton disabled={!canPlay} onClick={handleClick}>
        {isPlaying ? "Pause" : "Play"}
      </StyledButton>
    </Wrapper>
  );
}

Header.defaultProps = {
  imageShape: ImageShape.Square
};

export default Header;
