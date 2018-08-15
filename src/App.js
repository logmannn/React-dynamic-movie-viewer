import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import MoviesList from "./MoviesList";
import MovieDetail from "./MovieDetail";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <div className="links">
            <Link className="link" to="/">
              Home{" "}
            </Link>
            <Link className="link" to="/test">
              Test
            </Link>
          </div> */}
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </header>
        <Switch>
          <Route exact path="/" component={MoviesList} />
          <Route path="/:id" component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

const Test = ({ match }) => {
  return <h1>{match.params.id}</h1>;
};
