import * as React from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';
import './index.css';
import fetchAll from '../../utils/fetchAll';

export interface IMovie {
  [key: string]: boolean | string | number;
}
interface NowPlayingPageProps {}

interface NowPlayingPageState {
  completeResults: IMovie[][];
  currentPage: IMovie[];
  pageNumber: number;
  showAll: boolean;
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
      completeResults: [],
      currentPage: [],
      pageNumber: 0,
      showAll: true
    };
  }

  public async componentDidMount() {
    const res = await fetchAll();
    this.setState({
      completeResults: res,
      currentPage: res[0],
      pageNumber: 1,
      showAll: true
    });
  }

  private handlePageChange = async (pageNumber: number) => {
    this.setState({
      ...this.state,
      currentPage: this.state.completeResults[pageNumber],
      pageNumber: pageNumber + 1
    });
  };

  public render() {
    return (
      <div>
        <ul className="movie-list">
          {this.state.completeResults.length > 0
            ? this.state.currentPage.map(movie => (
                <MovieCard key={movie.id as number} data={movie} />
              ))
            : null}
        </ul>
        <div className="pages-button">
          {this.state.completeResults.map((page, idx) =>
            idx + 1 === this.state.pageNumber ? (
              <button
                key={idx}
                className="active-page"
                onClick={() => this.handlePageChange(idx)}
              >
                {idx + 1}
              </button>
            ) : (
              <button key={idx} onClick={() => this.handlePageChange(idx)}>
                {idx + 1}
              </button>
            )
          )}
        </div>
      </div>
    );
  }
}
