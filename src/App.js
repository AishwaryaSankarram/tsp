import React, { Component } from 'react';
import {Header} from './layouts/header';
import {MainPage} from './containers/main-page';
import 'font-awesome/css/font-awesome.min.css';
import {enablePriority} from './constants.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import openSocket from 'socket.io-client';


window.socket = openSocket("http://localhost:8089", { transports: ['websocket']});

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

  componentDidMount() {
    let string;
    enablePriority ? string = "true" : string = "false"
    window.socket.emit("priorities",JSON.stringify({tsp_enable: string}));
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

  toggleLogView(state){
    this.state.mainPage.toggleNotifications(state);
  }

  render() {
    return (
     <div className="App">
        <Header srmenable={this.srmEnable} ssmenable={this.ssmEnable} clearData={this.clearData} toggleNotifications={this.toggleLogView.bind(this)}>
        </Header>
        <MainPage handleMount={this.mainPageMount}/>
        <ToastContainer style={{fontSize: "16px", marginTop:"20%", marginLeft: "5%"}} />
      </div>
    );
  }
}

export default App;
