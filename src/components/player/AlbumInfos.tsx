import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import { Artist, Album } from "../../types";
import { State } from "../../reducers";
import { selectAlbumArtists } from "../../reducers/albums";
import { Image, Text } from "../core";
import { getImageSource, getArtistNames } from "../../utils";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyedImage = styled(Image)`
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  height: 75px;
  margin: -12.5px 12.5px -12.5px -12.5px;
  width: 75px;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled(Text)`
  margin-bottom: 6.25px;
`;

const ArtistNames = styled(Text)`
  color: ${props => props.theme.foreground.dark};
  font-weight: ${props => props.theme.font.weight.light};
`;

interface OwnProps {
  album: Album;
}

interface Props extends OwnProps {
  artists: Artist[];
}

function AlbumInfos({
  className,
  album,
  artists
}: Props & HTMLAttributes<HTMLElement>) {
  return (
    <Wrapper className={className}>
      <StyedImage source={getImageSource(album)} />
      <Infos>
        <Title>{album.name}</Title>
        <ArtistNames>{getArtistNames(artists)}</ArtistNames>
      </Infos>
    </Wrapper>
  );
}

const mapState = (state: State, { album }: OwnProps) => ({
  artists: selectAlbumArtists(state)(album.id)
});

export default connect(
  mapState,
  null
)(AlbumInfos);
