/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Connect from './containers/ConnectPage';
import List from './containers/ListPage';
import Settings from './containers/SettingsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/connect" component={Connect} />
      <Route path="/list" component={List} />
      <Route path="/settings" component={Settings} />
      <Route path="/" component={Connect} />
    </Switch>
  </App>
);
