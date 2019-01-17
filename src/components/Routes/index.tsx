import React, { FunctionComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import NowPlayingPage from '../../containers/NowPlayingPage';
import NotFoundPage from '../../components/NotFoundPage';
import MoviePage from '../MoviePage';
const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/nowplaying" />
      <Route exact path="/nowplaying" component={NowPlayingPage} />
      <Route path="/movie/:id" component={MoviePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  // TODO - Other Routes
};

export default Routes;
