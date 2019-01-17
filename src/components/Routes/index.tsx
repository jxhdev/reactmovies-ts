import React, { FunctionComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import NowPlayingPage from '../../containers/NowPlayingPage';
import NotFoundPage from '../../components/NotFoundPage';
import MoviePage from '../MoviePage';
import './Routes.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface IRoutesProps {
  [key: string]: any;
}
const Routes: FunctionComponent<IRoutesProps> = data => {
  console.log(data);
  return (
    <Switch>
      <Route
        exact
        path="/nowplaying"
        render={props => (
          <NowPlayingPage {...props} nowPlaying={data.nowPlaying} />
        )}
      />
      <Route
        path="/movies/:id"
        render={props => {
          console.log('inside render', props);
          let movieData = data.nowPlaying.reduce((all: any, item: any) => {
            let found = item.find(
              (element: any) => element.id === +props.match.params.id
            );
            if (found) {
              all = { ...found };
            }
            return all;
          }, {});
          return movieData ? (
            <MoviePage {...props} movieData={movieData} />
          ) : null; //TODO render a movie if not in now playing result
        }}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );

  // TODO - Other Routes
};

export default Routes;
