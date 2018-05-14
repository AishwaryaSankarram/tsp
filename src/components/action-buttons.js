import React, { Component } from 'react';
import '../css/action-buttons.css';
import {Checkbox} from "react-bootstrap";

export class ActionButtons extends Component {
 constructor(props){
 	super(props);
 	this.state = {
    enablePriority: true,
    isStarted: false, 
    isPlaying: false
 	}
 }

 handleChange = (event, item) => {
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
   let isStarted = this.state.isStarted;
   let socket = window.socket;
   console.log("openSocket------", socket);
   if (this.state.isStarted) { //Bus is in transit; So issue a reset now
     socket.emit("reset", "Reset all events-------");
     this.setState({isPlaying: true});
   } else {  //Reset has been when not started; So do nothing
     console.log("Invalid action");
   }
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
                <i className="fa fa-undo"></i>
            </button>
          </div>
        </div>
    );
  }
}
