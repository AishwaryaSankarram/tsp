import React, { Component } from 'react';
import '../css/action-buttons.css';
import {Checkbox} from "react-bootstrap";

export class ActionButtons extends Component {
 constructor(props){
 	super(props);
 	this.state = {
    enablePriority: true,
    isStarted: false,
    isPlaying: false,
    isLoading: false
 	}
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
   if(!this.state.isStarted){ //Play for first time
     socket.emit("play", "Start sending events-------");
     isStarted = true;
   }else if(!this.state.isPlaying){ //In Pause state; So resume now
     socket.emit("resume", "Resume sending events-------");
   }
   else{ //already started so pause now
     socket.emit("pause", "Pause sending events-------");
   }
   this.setState({isPlaying: !isPlaying, isStarted: isStarted});
 }

 handleReset(){
   let self = this;
   let socket = window.socket;
   let isStarted = this.state.isStarted;
   if (isStarted) { //Bus is in transit; So issue a reset now
     self.setState({isPlaying: true, isLoading: true});
     self.props.clearData();
     socket.emit("restart", "Restart all events-------");
     setTimeout(function() {
          self.setState({isLoading: false});
      }, 2000);
   } else {  //Reset has been when not started; So do nothing
     console.log("Invalid action");
   }
 }

 handleSettings(event) {
   this.props.settingsClick(event);
 }

 render() {
    return (
        <div className="header-icons">
          <Checkbox className="priority-checkbox" checked={this.state.enablePriority} onChange={(event) => this.handleChange(event, "enablePriority")}>
      	  	Enable Signal Priority
      	  </Checkbox>
          <div className="action-button-container" title={this.state.isPlaying ? "Pause" : this.state.isStarted ? "Resume": "Play"} onClick={this.togglePlay.bind(this)}>
            <button>
              <i className={"fa " + (this.state.isPlaying ? "fa-pause" : "fa-play") }></i>
            </button>
          </div>
        <div className="action-button-container" title="Restart"  onClick={this.handleReset.bind(this)}>
          <button disabled={!this.state.isStarted}>
                <i className={this.state.isLoading? "fa fa-undo fa-spin fa-fw" : "fa fa-undo" } ></i>
            </button>
          </div>

          <div className="action-button-container" title="Settings"  onClick={this.handleSettings.bind(this)}>
            <button>
                  <i className="fa fa-cog" ></i>
            </button>
            </div>
        </div>
    );
  }
}
