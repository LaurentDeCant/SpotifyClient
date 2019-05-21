import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Artist, Album, Track } from "../../types";
import { State } from "../../reducers";
import { Image, Text } from "../core";
import { getImageSource } from "../../utils";
import {
  selectLoadedArtists,
  selectLoadedAlbum,
  selectLoadedTrack
} from "../../reducers/player";
import ArtistList from "./ArtistList";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyedImage = styled(Image)`
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  height: 75px;
  margin-right: ${props => props.theme.thickness.small}px;
  width: 75px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled(Text)`
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
`;

interface Props {
  track?: Track;
  album?: Album;
  artists: Artist[];
}

function TrackInfos({
  className,
  track,
  album,
  artists
}: Props & HTMLAttributes<HTMLElement>) {
  return (
    <Wrapper className={className}>
      {album && (
        <Link to={`${process.env.PUBLIC_URL}/album/${album.id}`}>
          <StyedImage source={getImageSource(album)} />
        </Link>
      )}
      <Container>
        {track && <Title>{track.name}</Title>}
        <ArtistList artists={artists} />
      </Container>
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  track: selectLoadedTrack(state),
  album: selectLoadedAlbum(state),
  artists: selectLoadedArtists(state)
});

export default connect(
  mapState,
  null
)(TrackInfos);
