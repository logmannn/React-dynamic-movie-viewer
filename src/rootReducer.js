import { combineReducers } from 'redux';

import toggle from './toggle/reducer';
import movies from './movies/reducer';

const rootReducer = combineReducers({
  movies,
  toggle
});

export default rootReducer;
