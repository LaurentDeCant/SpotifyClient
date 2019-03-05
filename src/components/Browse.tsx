import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/browse";

interface Props {
  getCategories: () => void;
}

class Browse extends Component<Props> {
  componentDidUpdate() {
    this.props.getCategories();
  }

  render() {
    return <h2>Browse</h2>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getCategories: getCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
