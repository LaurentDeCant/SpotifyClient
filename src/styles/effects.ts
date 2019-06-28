import { Theme } from "./theme";

const clickable = (isOnPrimary?: boolean) => ({ theme }: { theme: Theme }) => `
  color: ${
    isOnPrimary ? theme.onPrimary.primary : theme.onBackground.secondary
  };
  overflow: hidden;
  position relative;
  
  &:disabled {
    color: ${
      isOnPrimary ? theme.onPrimary.tertiary : theme.onBackground.tertiary
    };
  }

  &:not(:disabled):hover {
    color: ${
      isOnPrimary ? theme.onPrimary.primary : theme.onBackground.primary
    };
  }

  &::before, &::after {
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity .2s;
    width: 100%;
    z-index: 1;
  }

  &::before {
    background: ${
      isOnPrimary ? theme.onPrimary.hover : theme.onBackground.hover
    };
  }

  &::after {
    background: ${
      isOnPrimary ? theme.onPrimary.active : theme.onBackground.active
    };
  }

  &:not(:disabled):hover::before,
  &:not(:disabled):active::after {
    opacity: 1;
  }
`;

export { clickable };
