import React from "react";
import { connect } from "react-redux";
import { Artist } from "../../types";
import { selectArtist } from "../../actions/search";
import { State } from "../../reducers";
import { selectArtists } from "../../selectors/search";
import ArtistCovers from "../covers/ArtistCovers";
import Wrapper from "./Wrapper";

interface ArtistsProps {
  artists: Artist[];
  selectArtist: (artistId: string) => void;
}

function Artists({ artists, selectArtist }: ArtistsProps) {
  return (
    <Wrapper>
      {artists.length > 0 && (
        <ArtistCovers artists={artists} onSelect={selectArtist} />
      )}
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  artists: selectArtists(state)
});

const mapDispatch = {
  selectArtist
};

export default connect(
  mapState,
  mapDispatch
)(Artists);
