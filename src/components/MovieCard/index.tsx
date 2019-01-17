import * as React from 'react';
import './MovieCard.css';
import { NavLink, Link } from 'react-router-dom';

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
      <Link
        to={{ pathname: `/movies/${props.data.id}` }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w185/${data.poster_path}`
              : ''
          }
          alt=""
        />
        <h2>{props.data.title}</h2>
      </Link>
    </div>
  );
};

export default MovieCard;
