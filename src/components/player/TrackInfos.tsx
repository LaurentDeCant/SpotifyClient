import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "../../styles/styled";
import { Artist, Album, Track } from "../../types";
import { State } from "../../reducers";
import { Image, Text, ToggleButton, IconType } from "../core";
import { getImageSource } from "../../utils";
import {
  selectLoadedArtists,
  selectLoadedAlbum,
  selectLoadedTrack
} from "../../reducers/player";
import ArtistNames from "../details/ArtistNames";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyedImage = styled(Image)`
  box-shadow: ${props => props.theme.shadow.middle};
  height: 75px;
  margin-right: ${props => props.theme.thickness.small}px;
  width: 75px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${props => props.theme.thickness.small}px;
  overflow: hidden;
`;

const Title = styled(Text)`
  margin-bottom: ${props => props.theme.thickness.extraSmall}px;
`;

const FavoriteButton = styled(ToggleButton).attrs(() => ({
  iconType: IconType.Favorite
}))`
  flex-shrink: 0;
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

      {track && (
        <>
          <Container>
            <Title>{track.name}</Title>
            <ArtistNames artists={artists} />
          </Container>

          <FavoriteButton />
        </>
      )}
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
