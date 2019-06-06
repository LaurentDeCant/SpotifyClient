import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserTracks } from "../../actions/library";

interface Props {
  getUserTracks: () => void;
}

function Tracks({ getUserTracks }: Props) {
  useEffect(getUserTracks, []);

  return <></>;
}

const mapDispatch = {
  getUserTracks
};

export default connect(
  null,
  mapDispatch
)(Tracks);
