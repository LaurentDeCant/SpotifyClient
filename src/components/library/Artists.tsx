import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserArtists } from "../../actions/following";

interface Props {
  getUserArtists: () => void;
}

function Artists({ getUserArtists }: Props) {
  useEffect(getUserArtists, []);

  return <></>;
}

const mapDispatch = {
  getUserArtists
};

export default connect(
  null,
  mapDispatch
)(Artists);
