import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Artist } from "../../types";
import { getFollowedArtists } from "../../actions/following";
import { State } from "../../reducers";
import { selectFollowedArtists } from "../../reducers/following";
import { Heading } from "../core";
import ArtistCovers from "../covers/ArtistCovers";
import withLoader from "../withLoader";

const StyledHeading = styled(Heading)`
  align-self: center;
  font-size: ${props => props.theme.fontSize.extraExtraLarge};
`;

interface Props {
  artists: Artist[];
  getFollowedArtists: () => void;
}

function FollowedArtists({ artists, getFollowedArtists }: Props) {
  useEffect(getFollowedArtists, []);

  return artists.length ? (
    <ArtistCovers artists={artists} />
  ) : (
    <StyledHeading>No followed artists.</StyledHeading>
  );
}

const mapState = (state: State) => ({
  artists: selectFollowedArtists(state)
});

const mapDispatch = {
  getFollowedArtists
};

export default withLoader(
  connect(
    mapState,
    mapDispatch
  )(FollowedArtists)
);
