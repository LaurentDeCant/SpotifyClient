import React, { ReactNode } from "react";
import styled from "../../styles/styled";
import { Icon, Text, IconType } from "../core";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const StyledIcon = styled(Icon).attrs(() => ({
  type: IconType.SentimentVeryDissatisfied
}))`
  color: ${props => props.theme.foreground.dark};
  font-size: ${props => 4 * props.theme.fontSize.extraExtraLarge}px;
  margin-bottom: ${props => props.theme.thickness.medium}px;
`;

const StyledText = styled(Text)`
  font-size: ${props => props.theme.fontSize.extraExtraLarge}px;
`;

interface Props {
  children: ReactNode;
}

function Empty({ children }: Props) {
  return (
    <Wrapper>
      <StyledIcon />
      <StyledText>{children}</StyledText>
    </Wrapper>
  );
}

export default Empty;
