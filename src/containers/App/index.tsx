import React, { Component } from 'react';
import './App.css';
import Header from '../../components/Header';
import NowPlayingPage from '../NowPlayingPage';
import Routes from '../../components/Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main className="content-container">
          <Routes />
        </main>
      </div>
    );
  }
}

export default App;
