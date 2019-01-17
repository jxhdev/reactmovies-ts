import * as React from 'react';
import './MovieCard.css';

interface Movie {
  [key: string]: string | boolean | number;
}

interface MovieCardProps {
  data: Movie;
}

const MovieCard: React.SFC<MovieCardProps> = props => {
  const { data } = props;
  return (
    <div key={props.data.id as number} className="movie-card">
      <img
        src={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w185/${data.poster_path}`
            : ''
        }
        alt=""
      />
      <h2>{props.data.title}</h2>
    </div>
  );
};

export default MovieCard;
