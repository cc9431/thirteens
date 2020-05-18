/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from '../LandingPage/Loadable';
import PlayerPage from '../PlayerPage/Loadable';
import GamePage from '../GamePage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/players" component={PlayerPage} />
        <Route exact path="/play" component={GamePage} />
        <Redirect to="/" />;
      </Switch>
      <GlobalStyle />
    </div>
  );
}
