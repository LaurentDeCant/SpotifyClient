import React from "react";
import styled from "../../styles/styled";
import Button from "../Button";
import Text from "../Text";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Image = styled.img`
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  height: 300px;
  margin-bottom: 10px;
  width: 300px;
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.font.size.large}
  margin-bottom: 5px;
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background: ${props => props.theme.primary};
  border-radius: 20px;
  color: ${props => props.theme.foreground.default};
  padding: 10px 40px;

  &::before {
    border-radius: 20px;
  }
`;

interface Props {
  image: string;
  title: string;
  subTitle: string;
  isPlaying: boolean;
  onToggle: () => void;
}

function Cover({ image, title, subTitle, isPlaying, onToggle }: Props) {
  function handleClick() {
    onToggle();
  }

  return (
    <Wrapper>
      <Image src={image} />
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <StyledButton onClick={handleClick}>
        {isPlaying ? "Pause" : "Play"}
      </StyledButton>
    </Wrapper>
  );
}

export default Cover;
