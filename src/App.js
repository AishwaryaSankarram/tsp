import React, { Component } from 'react';
import {Header} from './layouts/header';
import {MainPage} from './containers/main-page';
import 'font-awesome/css/font-awesome.min.css';

import openSocket from 'socket.io-client';

window.socket = openSocket("http://192.168.1.3:8088", { transports: ['websocket'] });

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

