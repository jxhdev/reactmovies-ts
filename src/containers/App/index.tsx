import React, { Component } from 'react';
import './App.css';
import Header from '../../components/Header';
import NowPlayingPage from '../../components/NowPlayingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main>
          <NowPlayingPage />
        </main>
      </div>
    );
  }
}

export default App;
