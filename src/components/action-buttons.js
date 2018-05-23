import React, { Component } from 'react';
import '../css/action-buttons.css';
import {Checkbox} from "react-bootstrap";
import Popover from 'material-ui/Popover';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {SettingsPopover} from './settings-popover';


export class ActionButtons extends Component {
 constructor(props){
 	super(props);
 	this.state = {
    enablePriority: true,
    isStarted: false,
    isPlaying: false,
    isLoading: false,
    settingsPopoverOpen: false,
    settingsPopoverEl: null,
    srmEnabled: false,
    ssmEnabled: false
 	}
  this.srmEnable = this.srmEnable.bind(this);
  this.ssmEnable = this.ssmEnable.bind(this);
 }

 handleChange = (event, item) => {
  let socketCommand;
  event.target.checked ? socketCommand = "enable" : socketCommand = "disable";
  let webSocket = window.socket;
  console.log("Sending signal priority...");
  webSocket.emit("priorities",JSON.stringify({command:socketCommand}));
	this.setState({
	  [item]: event.target.checked
	});
 }

 togglePlay() {
   let isPlaying = this.state.isPlaying;
   let isStarted = this.state.isStarted;
   let socket = window.socket;
   console.log("openSocket------", socket);
   if(!this.state.isPlaying){ //In Stop state; So start playing now
     socket.emit("start", "Resume sending events-------");
   }
   else{ //already started so stop now
     socket.emit("stop", "Pause sending events-------");
   }
   this.setState({isPlaying: !isPlaying, isStarted: isStarted});
 }

 srmEnable(state) {
   this.setState({srmEnabled: state});
   this.props.srmenable(state);
 }

 ssmEnable(state) {
   this.setState({ssmEnabled: state});
   this.props.ssmenable(state);
 }

 handleReset(){
    let self = this;
    self.setState({isLoading: true});
    self.props.clearData();
    setTimeout(function() {
        self.setState({isLoading: false});
    }, 1000);
 }

 handleSettingsClick(event) {
   this.setState({
     settingsPopoverOpen: true,
     settingsPopoverEl: event.target
   });
 }

 handleSettingsPopoverClose() {
   this.setState({settingsPopoverOpen: false});
 }

 render() {
    return (
        <div className="header-icons">
          <Checkbox className="priority-checkbox" checked={this.state.enablePriority} onChange={(event) => this.handleChange(event, "enablePriority")}>
      	  	Enable Signal Priority
      	  </Checkbox>
          <div className="action-button-container" title="Settings">
            <button onClick={this.handleSettingsClick.bind(this)}>
                  <i className="fa fa-cog" ></i>
            </button>
          </div>
          <MuiThemeProvider >
              <div>
              {this.state.settingsPopoverOpen && <Popover
                className='settings-popover'
                open={this.state.settingsPopoverOpen}
                anchorEl={this.state.settingsPopoverEl}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleSettingsPopoverClose.bind(this)}>
                <SettingsPopover srmenable={this.state.srmEnabled} ssmenable={this.state.ssmEnabled} srmenableaction={this.srmEnable} ssmenableaction={this.ssmEnable} />
                </Popover> }
              </div>
            </MuiThemeProvider>
          <div className="action-button-container" title={this.state.isPlaying ? "Stop" : "Play"} onClick={this.togglePlay.bind(this)}>
            <button>
              <i className={"fa " + (this.state.isPlaying ? "fa-stop" : "fa-play") }></i>
            </button>
          </div>
        <div className="action-button-container" title="Clear Data"  onClick={this.handleReset.bind(this)}>
          <button>
                <i className={this.state.isLoading? "fa fa-trash fa-spin fa-fw" : "fa fa-trash" } ></i>
            </button>
          </div>
        </div>
    );
  }
}
