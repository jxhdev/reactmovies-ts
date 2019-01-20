import * as React from 'react';
import { IMovie } from '../../containers/NowPlayingPage';
import { RouteComponentProps, StaticContext } from 'react-router';
import { fetchMovie } from '../../utils/fetchAll';
import './MoviePage.css';
import { url } from 'inspector';

export interface MoviePageProps extends RouteComponentProps<any> {}

export interface MoviePageState {
  data: {
    genres?: any[] | undefined;
    [key: string]: any[] | string | number | undefined;
  };
  error: boolean;
  errorMessage: string;
  loading: boolean;
}

class MoviePage extends React.Component<MoviePageProps, MoviePageState> {
  constructor(props: MoviePageProps) {
    super(props);
    console.log(props);
    this.state = { data: {}, loading: true, error: false, errorMessage: '' };
  }

  public async componentDidMount() {
    let result = await fetchMovie(this.props.match.params.id);
    console.log(result.data);
    this.setState({ ...this.state, data: result.data, loading: false });
  }

  private formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  render() {
    const { data } = this.state;

    return (
      <>
        {!this.state.loading && (
          <div
            className="movie-page"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w780/${
                data.backdrop_path
              })`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="movie-page__infobox">
              <div className="movie-page__infobox-title">
                <h1>{data.title}</h1>
                <div className="tagline">
                  <i>{data.tagline}</i>
                </div>
                <div className="rating">
                  <p>
                    Rating: {data.vote_average} / 10{' '}
                    <span className="vote-count">
                      ({data.vote_count} votes)
                    </span>
                  </p>
                </div>
              </div>
              <div className="movie-page__infobox-description">
                <ul>
                  <li>
                    Runtime: {data.runtime ? data.runtime + ' minutes' : 'n/a'}
                  </li>
                  <li>
                    Budget:{' '}
                    {data.budget && data.budget > 0
                      ? this.formatter.format(data.budget as number)
                      : 'n/a'}
                  </li>
                  <li>
                    Genre:{' '}
                    {data.genres && data.genres.map(item => item.name + ' ')}
                  </li>
                </ul>
                <p>Overview: {data.overview}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MoviePage;

// const MoviePage: React.FunctionComponent<MoviePageProps> = props => {
//   console.log(props);

//   const [data, setData] = React.useState({ result: [] });
//   React.useEffect(async () => {
//     let res = await fetchMovie(props.match.params.id);
//     setData(res.data);
//   });
//   return
// };

// export default MoviePage;
// //
