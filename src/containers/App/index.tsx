import React, { Component } from 'react';
import './App.css';
import Header from '../../components/Header';
import NowPlayingPage from '../NowPlayingPage';
import Routes from '../../components/Routes';
import fetchAllNowPlaying from '../../utils/fetchAll';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface IMovie {
  [key: string]: boolean | string | number;
}
interface IState {
  nowPlaying: IMovie[][];
  currentPage: IMovie[];
  pageNumber: number;
  resolved: boolean;
}

const MoviesContext = React.createContext({
  nowPlaying: []
});

class App extends Component<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      nowPlaying: [],
      currentPage: [],
      pageNumber: 0,
      resolved: false
    };
  }

  public async componentDidMount() {
    const res = await fetchAllNowPlaying();
    console.log('res', res);
    this.setState({
      nowPlaying: res,
      currentPage: res[0],
      pageNumber: 1,
      resolved: true
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main className="content-container">
          {this.state.resolved ? (
            <Routes nowPlaying={this.state.nowPlaying} />
          ) : (
            <></>
          )}
        </main>
      </div>
    );
  }
}

export default App;
