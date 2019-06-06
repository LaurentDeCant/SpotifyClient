import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserAlbums } from "../../actions/library";

interface Props {
  getUserAlbums: () => void;
}

function Albums({ getUserAlbums }: Props) {
  useEffect(getUserAlbums, []);

  return <></>;
}

const mapDispatch = {
  getUserAlbums
};

export default connect(
  null,
  mapDispatch
)(Albums);
