import React, { Component } from 'react';
import {Header} from './layouts/header';
import {MainPage} from './containers/main-page';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
     <div className="App">
        <Header/>
        <MainPage/>
      </div>
    );
  }
}

export default App;

