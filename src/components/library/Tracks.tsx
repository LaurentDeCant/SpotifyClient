import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTracks } from "../../actions/library";

interface Props {
  getTracks: () => void;
}

function Tracks({ getTracks }: Props) {
  useEffect(getTracks, []);

  return <></>;
}

const mapDispatch = {
  getTracks
};

export default connect(
  null,
  mapDispatch
)(Tracks);
