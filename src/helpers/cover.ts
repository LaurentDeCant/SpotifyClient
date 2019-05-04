import { Album, Artist, Category, Playlist } from "../types";
import { joinArtistNames } from "./artist";

export interface Cover {
  id: string;
  image: string;
  title: string;
  subTitle?: string;
}

export function getAlbumCovers(albums: Album[]): Cover[] {
  return albums
    .filter(album => album.images && album.images.length)
    .map(album => ({
      id: album.id,
      image: album.images[0].url,
      title: album.name,
      subTitle: joinArtistNames(album.artists)
    }));
}

export function getArtistCovers(artists: Artist[]): Cover[] {
  return artists
    .filter(artist => artist.images && artist.images.length)
    .map(artist => ({
      id: artist.id,
      image: artist.images[0].url,
      title: artist.name
    }));
}

export function getCategoryCovers(categories: Category[]): Cover[] {
  return categories
    .filter(category => category.icons && category.icons.length)
    .map(category => ({
      id: category.id,
      image: category.icons[0].url,
      title: category.name
    }));
}

export function getPlaylistCovers(playlists: Playlist[]): Cover[] {
  return playlists
    .filter(playlist => playlist.images && playlist.images.length)
    .map(playlist => ({
      id: playlist.id,
      image: playlist.images[0].url,
      title: playlist.name,
      subTitle: playlist.owner.display_name
    }));
}
