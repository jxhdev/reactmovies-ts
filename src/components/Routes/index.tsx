import React, { FunctionComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import NowPlayingPage from '../../containers/NowPlayingPage';
import NotFoundPage from '../../components/NotFoundPage';
import MoviePage from '../MoviePage';
import './Routes.css';

import posed, { PoseGroup } from 'react-pose';
import uuid from 'uuid/v4';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 500, beforeChildren: true },
  exit: { opacity: 0 }
});
interface IRoutesProps {
  [key: string]: any;
}
const Routes: FunctionComponent<IRoutesProps> = data => {
  console.log(data);
  return (
    <PoseGroup>
      <RouteContainer key={uuid()}>
        <Switch>
          <Route
            exact
            path="/nowplaying"
            component={(props: any) => (
              <NowPlayingPage
                {...props}
                nowPlaying={data.nowPlaying}
                key="NowPlayingPage"
              />
            )}
          />
          <Route
            path="/movies/:id"
            component={(props: any) => {
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
          <Route component={NotFoundPage} key="notFound" />
        </Switch>
      </RouteContainer>
    </PoseGroup>
  );

  // TODO - Other Routes
};

export default Routes;
