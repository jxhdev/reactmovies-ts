import * as React from 'react';
import { IMovie } from '../../containers/NowPlayingPage';
import { RouteComponentProps, StaticContext } from 'react-router';
import { fetchMovie } from '../../utils/fetchAll';
import './MoviePage.css';
import { url } from 'inspector';

export interface MoviePageProps extends RouteComponentProps<any> {}

export interface MoviePageState {
  data: {
    [key: string]: string | number | undefined;
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
              <h1 className="movie-page__infobox-title">{data.title}</h1>
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
