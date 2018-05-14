import React, { Component } from 'react';
import './App.css';
import MatchHistory from './matchHistory/matchHistory';
import SearchComponent from "./matchHistory/searchComponent/searchComponent";

class App extends Component {

  render() {
    return [
      <SearchComponent key={"SearchComponent"}/>,
      <MatchHistory key={"MatchHistory"}/>
    ]
  }
}
export default App;
