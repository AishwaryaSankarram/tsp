import React, { Component } from 'react';
import {Header} from './layouts/header';
import {MainPage} from './containers/main-page';
import 'font-awesome/css/font-awesome.min.css';

import openSocket from 'socket.io-client';

window.socket = openSocket("http://localhost:8089", { transports: ['websocket'] });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPage: null
    }

    this.mainPageMount = this.mainPageMount.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  mainPageMount(obj) {
    this.setState({mainPage: obj});
  }

  clearData() {
    this.state.mainPage.clearData();
  }

  render() {
    return (
     <div className="App">
        <Header clearData={this.clearData}/>
        <MainPage handleMount={this.mainPageMount}/>
      </div>
    );
  }
}

export default App;
