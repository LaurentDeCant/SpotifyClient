import { Type } from "../types";

export function createAlbum() {
  return {
    album_type: "",
    artists: [],
    available_markets: [],
    coyrights: [],
    external_ids: [],
    external_urls: [],
    genres: [],
    href: "",
    id: "",
    images: [],
    label: "",
    name: "",
    popularity: 0,
    release_date: "",
    release_date_precision: "",
    restrictions: [],
    tracks: [],
    type: Type.Album,
    uri: "",
    isSaved: false
  };
}

export function createArtist() {
  return {
    external_url: undefined,
    followers: undefined,
    genres: [],
    href: "",
    id: "",
    images: [],
    name: "",
    popularity: 0,
    type: Type.Artist,
    uri: "",
    albums: [],
    relatedArtists: [],
    topTracks: [],
    isFollowed: false
  };
}

export function createPlaylist() {
  return {
    collaborative: false,
    description: "",
    external_urls: undefined,
    followers: [],
    href: "",
    id: "",
    images: [],
    name: "",
    owner: createUser(),
    public: false,
    snapshot_id: "",
    tracks: [],
    type: Type.Playlist,
    uri: "",
    isFollowed: false
  };
}

export function createTrack() {
  return {
    album: "",
    artists: [],
    available_markets: [],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_ids: undefined,
    external_urls: undefined,
    href: "",
    id: "",
    is_playable: false,
    linked_from: undefined,
    restrictions: [],
    name: "",
    popularity: 0,
    preview_url: " ",
    track_number: 0,
    type: "",
    uri: "",
    is_local: false,
    isSaved: false
  };
}

function createUser() {
  return {
    display_name: "",
    external_urls: [],
    followers: undefined,
    href: "",
    id: "",
    images: [],
    type: "",
    uri: ""
  };
}
