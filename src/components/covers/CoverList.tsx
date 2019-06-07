import React from "react";
import styled from "../../styles/styled";
import { Cover } from "./types";
import CoverItem from "./CoverItem";

const StyledList = styled.ul`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -${props => props.theme.thickness.small}px;
  width: calc(100% + 2 * ${props => props.theme.thickness.small}px);
`;

function splitWidth(times: number) {
  return `calc((100% - ${times * 25}px) / ${times} - 4px)`;
}

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.thickness.small}px;
  width: ${splitWidth(2)};

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    width: ${splitWidth(3)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.small}px) {
    width: ${splitWidth(6)};
  }
`;

interface Props {
  className?: string;
  covers: Cover[];
  onClick: (id: string) => void;
}

function CoverList({ className, covers, onClick }: Props) {
  return (
    <StyledList className={className}>
      {covers.map(cover => (
        <StyledItem key={cover.id}>
          <CoverItem cover={cover} onClick={onClick} />
        </StyledItem>
      ))}
    </StyledList>
  );
}

export default CoverList;
