import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Album } from "../../types";
import { getSavedAlbums } from "../../actions/library";
import { State } from "../../reducers";
import { selectSavedAlbums } from "../../reducers/library";
import { Heading } from "../core";
import AlbumCovers from "../covers/AlbumCovers";
import withLoader from "../withLoader";

const StyledHeading = styled(Heading)`
  align-self: center;
  font-size: ${props => props.theme.fontSize.extraExtraLarge};
`;

interface Props {
  albums: Album[];
  getSavedAlbums: () => void;
}

function SavedAlbums({ albums, getSavedAlbums }: Props) {
  useEffect(getSavedAlbums, []);

  return albums.length ? (
    <AlbumCovers albums={albums} />
  ) : (
    <StyledHeading>No saved albums.</StyledHeading>
  );
}

const mapState = (state: State) => ({
  albums: selectSavedAlbums(state)
});

const mapDispatch = {
  getSavedAlbums
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(SavedAlbums)
);
