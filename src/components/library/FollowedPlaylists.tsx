import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Playlist } from "../../types";
import { getFollowedPlaylists } from "../../actions/following";
import { State } from "../../reducers";
import { selectFollowedPlaylists } from "../../reducers/following";
import { Heading } from "../core";
import PlaylistCovers from "../covers/PlaylistCovers";
import withLoader from "../withLoader";

const StyledHeading = styled(Heading)`
  align-self: center;
  font-size: ${props => props.theme.fontSize.extraExtraLarge};
`;

interface Props {
  playlists: Playlist[];
  getFollowedPlaylists: () => void;
}

function FollowedPlaylists({ playlists, getFollowedPlaylists }: Props) {
  useEffect(getFollowedPlaylists, []);

  return playlists.length ? (
    <PlaylistCovers playlists={playlists} />
  ) : (
    <StyledHeading>No followed playlists.</StyledHeading>
  );
}

const mapState = (state: State) => ({
  playlists: selectFollowedPlaylists(state)
});

const mapDispatch = {
  getFollowedPlaylists
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(FollowedPlaylists)
);
