import React, { Component } from 'react';
import '../css/action-buttons.css'; 
import {Checkbox} from "react-bootstrap";

export class ActionButtons extends Component {
 constructor(props){
 	super(props);
 	this.state = {
 		enablePriority: true,
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
   this.setState({isPlaying: !isPlaying});
 }

 render() {
    return (
        <div className="header-icons">
          <Checkbox className="priority-checkbox" checked={this.state.enablePriority} onChange={(event) => this.handleChange(event, "enablePriority")}>
      	  	Enable Signal Priorty
      	  </Checkbox>
          <div className="action-button-container" onClick={this.togglePlay.bind(this)}>
            <button>
              <i className={"fa " + (this.state.isPlaying ? "fa-stop" : "fa-play") }></i>
            </button>
          </div>	
          <div className="action-button-container">
            <button>
              Send SRM
            </button>
          </div>
        </div>
    );
  }
}