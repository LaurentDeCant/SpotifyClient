import React from "react";
import styled from "../../styles/styled";
import { Button, Image, Text } from "../core";
import { ImageShape } from "../core/Image";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  justify-content: center;
  margin: 0 0 25px 0;

  @media (min-width: ${({ theme }) => theme.breackpoints.small}px) {
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 25px 0 0;
  }
`;

const length = 300;
const StyledImage = styled(Image)`
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  font-size: ${length / 4}px;
  height: ${length / 2}px;
  line-height: ${length / 2}px;
  margin: 0 25px 0 0;
  width: ${length / 2}px;

  @media (min-width: ${({ theme }) => theme.breackpoints.small}px) {
    font-size: ${length / 2}px;
    height: ${length}px;
    line-height: ${length}px;
    margin: 0 0 25px 0;
    width: ${length}px;
  }
`;

const Div = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.font.size.large};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breackpoints.small}px) {
    font-size: ${props => props.theme.font.size.extraLarge};
    width: ${length}px;
  }
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  display: inline-block;
  font-size: ${props => props.theme.font.size.medium};
  font-weight: ${props => props.theme.font.weight.light};
  margin-top: 6.25px;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breackpoints.small}px) {
    font-size: ${props => props.theme.font.size.large};
    width: ${length}px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 25px;
  width: 100px;
`;

interface Props {
  imageSource?: string;
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
  console.log("Header");

  function handleClick() {
    onToggle();
  }

  return (
    <Wrapper>
      <StyledImage source={imageSource} shape={imageShape} />
      <Div>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <StyledButton disabled={!canPlay} onClick={handleClick}>
          {isPlaying ? "Pause" : "Play"}
        </StyledButton>
      </Div>
    </Wrapper>
  );
}

Header.defaultProps = {
  imageShape: ImageShape.Square
};

export default Header;
