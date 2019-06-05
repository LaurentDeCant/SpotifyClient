import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAlbums } from "../../actions/library";

interface Props {
  getAlbums: () => void;
}

function Albums({ getAlbums }: Props) {
  useEffect(getAlbums, []);

  return <></>;
}

const mapDispatch = {
  getAlbums
};

export default connect(
  null,
  mapDispatch
)(Albums);
