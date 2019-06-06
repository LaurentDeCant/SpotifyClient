import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserPlaylists } from "../../actions/following";

interface Props {
  getUserPlaylists: () => void;
}

function Playlists({ getUserPlaylists }: Props) {
  useEffect(getUserPlaylists, []);

  return <></>;
}

const mapDispatch = {
  getUserPlaylists
};

export default connect(
  null,
  mapDispatch
)(Playlists);
