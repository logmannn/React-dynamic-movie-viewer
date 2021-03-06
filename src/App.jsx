import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';
import logo from './logo.svg';
import './App.css';


import rootReducer from './rootReducer';

import MoviesList from './movies/MoviesList';
import MovieDetail from './movies/MovieDetail';
// import Toggle from './toggle/Toggle';

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(...middleware, save())),
);

const MyMoviesList = props => (
  <MoviesList {...props} />
);

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </header>
        {/* <Toggle /> */}
        <Switch>
          <Route exact path="/" component={MyMoviesList} />
          <Route exact path="/page/:id" component={MyMoviesList} />
          <Route path="/:id" component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
