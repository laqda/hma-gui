// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import connect from './connect';
import list from './list';
import settings from './settings';

const rootReducer = combineReducers({
  router,
  connect,
  list,
  settings,
});

export default rootReducer;
