import React, { Component } from 'react';
import {Header} from './layouts/header';
import {MainPage} from './containers/main-page';
import 'font-awesome/css/font-awesome.min.css';

import openSocket from 'socket.io-client';

window.socket = openSocket("http:/localhost:8089", { transports: ['websocket']});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPage: null,
    }

    this.mainPageMount = this.mainPageMount.bind(this);
    this.clearData = this.clearData.bind(this);
    this.srmEnable = this.srmEnable.bind(this);
    this.ssmEnable = this.ssmEnable.bind(this);
  }

  mainPageMount(obj) {
    this.setState({mainPage: obj});
  }

  settingsClick(event) {
    this.setState({
      settingsPopoverOpen: true,
      settingsPopoverEl: event.target
    });
  }

  handleSettingsPopoverClose() {
    this.setState({settingsPopoverOpen: false});
  }

  srmEnable(state) {
    this.state.mainPage.srmEnable(state);
  }

  ssmEnable(state) {
    this.state.mainPage.ssmEnable(state);
  }

  clearData() {
    this.state.mainPage.clearData();
  }

  render() {
    return (
     <div className="App">
        <Header srmenable={this.srmEnable} ssmenable={this.ssmEnable} settingsClick={this.settingsClick.bind(this)} clearData={this.clearData}>
        </Header>
        <MainPage handleMount={this.mainPageMount}/>
      </div>
    );
  }
}

export default App;
