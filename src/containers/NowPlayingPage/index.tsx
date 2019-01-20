import * as React from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import './NowPlayingPage.css';
import { fetchAllNowPlaying } from '../../utils/fetchAll';
import uuid from 'uuid/v4';

export interface IMovie {
  [key: string]: boolean | string | number;
}
interface NowPlayingPageProps {}

interface NowPlayingPageState {
  completeResults: IMovie[][];
  currentPage: IMovie[];
  pageNumber: number;
  filtering: boolean;
  filterBy: string;
  filteredResults: IMovie[];
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
      filtering: false,
      filterBy: '',
      filteredResults: []
    };
  }

  public async componentDidMount() {
    const res = await fetchAllNowPlaying();
    this.setState({
      completeResults: res,
      currentPage: res[0],
      pageNumber: 1,
      filtering: false
    });
  }

  private handlePageChange = async (pageNumber: number) => {
    this.setState({
      ...this.state,
      currentPage: this.state.completeResults[pageNumber],
      pageNumber: pageNumber + 1
    });
  };

  private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      this.setState({
        ...this.state,
        filterBy: e.target.value,
        filtering: false
      });
    } else {
      this.setState({
        ...this.state,
        filterBy: e.target.value,
        filtering: true,
        filteredResults: this.state.completeResults.reduce((all, results) => {
          all = all.concat(
            results.filter(movie =>
              (movie.title as string).toLowerCase().includes(e.target.value)
            )
          );
          return all;
        }, [])
      });
    }
  };

  public render() {
    return (
      <div className="now-playing-page">
        <input
          type="text"
          onChange={this.handleSearchChange}
          value={this.state.filterBy}
          placeholder="Filter results"
        />
        {!this.state.filtering && (
          <>
            <ul className="movie-list">
              {this.state.completeResults.length > 0
                ? this.state.currentPage.map(movie => (
                    <li key={uuid()}>
                      <MovieCard data={movie} />
                    </li>
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
          </>
        )}
        {this.state.filtering && (
          <ul className="movie-list">
            {this.state.filteredResults.map(movie => (
              <MovieCard key={uuid()} data={movie} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
