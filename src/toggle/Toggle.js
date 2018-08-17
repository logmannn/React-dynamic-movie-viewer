import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { toggleMessage } from "./actions";
import { getMovies } from "../movies/actions";

const Toggle = ({ messageVisibility, toggleMessage }) => (
  <div>
    <button onClick={toggleMessage}>Toggle Me</button>
    {messageVisibility && (
      <p>You will be seeing this if redux action is toggled</p>
    )}
  </div>
);

const mapStateToProps = state => ({
  messageVisibility: state.toggle.messageVisibility
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMessage
    },
    dispatch
  );

// connects mapStateToProps with mapDispatchToProps
// (which dispatches the onClick action from each specific actions.js
// to the reducer where the processing happens)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle);
