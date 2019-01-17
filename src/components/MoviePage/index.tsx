import * as React from 'react';
import './MoviePage.css';

const MoviePage: React.FunctionComponent<any> = props => {
  console.log(props.movieData);
  return (
    <div
      className="movie-page-container"
      style={{
        width: `100vw`,
        background: `url(https://image.tmdb.org/t/p/w780/${
          props.movieData.backdrop_path
        }) no-repeat center`,
        backgroundSize: `cover`
      }}
    >
      <h1>{props.movieData.title}</h1>
      <img src="" alt="" />
    </div>
  );
};

export default MoviePage;
