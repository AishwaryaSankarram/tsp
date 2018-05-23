import React, { Component } from 'react';
import {Header} from './layouts/header';
import {MainPage} from './containers/main-page';
import 'font-awesome/css/font-awesome.min.css';
import Popover from 'material-ui/Popover';
import {SettingsPopover} from './components/settings-popover';
import {Checkbox} from "react-bootstrap";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import openSocket from 'socket.io-client';

window.socket = openSocket("http://192.168.1.5:8089", { transports: ['websocket']});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPage: null,
      settingsPopoverOpen: false,
      settingsPopoverEl: null,
      srmEnabled: false,
      ssmEnabled: false
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
    this.setState({srmEnabled: state});
    this.state.mainPage.srmEnable(state);
  }

  ssmEnable(state) {
    this.setState({ssmEnabled: state});
    this.state.mainPage.ssmEnable(state);
  }

  clearData() {
    this.state.mainPage.clearData();
  }

  render() {
    return (
     <div className="App">
        <Header settingsClick={this.settingsClick.bind(this)} clearData={this.clearData}>
        </Header>
        <MuiThemeProvider >
            {this.state.settingsPopoverOpen && <Popover
              open={this.state.settingsPopoverOpen}
              anchorEl={this.state.settingsPopoverEl}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
              onRequestClose={this.handleSettingsPopoverClose.bind(this)}>
              <SettingsPopover srmenable={this.state.srmEnabled} ssmenable={this.state.ssmEnabled} srmenableaction={this.srmEnable} ssmenableaction={this.ssmEnable} />
              </Popover> }
          </MuiThemeProvider>
        <MainPage handleMount={this.mainPageMount}/>
      </div>
    );
  }
}

export default App;
