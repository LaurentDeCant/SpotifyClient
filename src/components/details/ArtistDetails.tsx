import React from "react";
import { RouteComponentProps } from "react-router";

interface Params {
  albumId: string;
}

interface Props extends RouteComponentProps<Params> {}

function ArtistDetails(props: Props) {
  return <div />;
}

export default ArtistDetails;
