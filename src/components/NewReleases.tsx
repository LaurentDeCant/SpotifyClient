import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Album } from "../types/browse";
import { State } from "../reducers";
import { selectNewReleases } from "../reducers/browse";
import { getNewReleases } from "../actions/browse";
import Tiles from "./Tiles";

interface Props {
  newReleases: Album[];
  getNewReleases: () => void;
}

class NewReleases extends Component<Props> {
  componentDidMount() {
    this.props.getNewReleases();
  }

  handleClick() {}

  render() {
    const { newReleases } = this.props;
    const items = newReleases.map(newRelease => ({
      id: newRelease.id,
      image: newRelease.images[0].url,
      label: newRelease.name
    }));

    return <Tiles items={items} />;
  }
}

const mapStateToProps = (state: State) => ({
  newReleases: selectNewReleases(state)
});

const mapDispatchToProps = {
  getNewReleases: getNewReleases
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewReleases);
