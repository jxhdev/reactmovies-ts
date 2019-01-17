import * as React from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';
import './index.css';

export interface IMovie {
  [key: string]: boolean | string | number;
}
interface NowPlayingPageProps {}

interface NowPlayingPageState {
  movies: IMovie[];
  pages: any[];
  pageNumber: number;
}

export default class NowPlayingPage extends React.Component<
  NowPlayingPageProps,
  NowPlayingPageState
> {
  response = {};
  pages: number[] = [];
  public constructor(props: NowPlayingPageProps) {
    super(props);
    this.state = {
      movies: [],
      pages: [],
      pageNumber: 1
    };
  }

  public componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=1&region=us
`
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          movies: response.data.results,
          pages: Array(response.data.total_pages)
            .fill(1)
            .map((item, idx) => idx + 1)
        });
        this.response = response.data;
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  private handlePageChange = async (pageNumber: number) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=${pageNumber}&region=us
`
      )
      .then(response => {
        this.setState({
          movies: response.data.results,
          pageNumber
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  public render() {
    return (
      <div>
        <ul className="movie-list">
          {this.state.movies.map(movie => (
            <MovieCard key={movie.id as number} data={movie} />
          ))}
        </ul>
        <div className="pages-button">
          {this.state.pages.map(page =>
            page === this.state.pageNumber ? (
              <button
                key={page}
                className="active-page"
                onClick={() => this.handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <button key={page} onClick={() => this.handlePageChange(page)}>
                {page}
              </button>
            )
          )}
        </div>
      </div>
    );
  }
}
