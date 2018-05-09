import React, { Component } from 'react';
import '../css/action-buttons.css';
import {Checkbox} from "react-bootstrap";

export class ActionButtons extends Component {
 constructor(props){
 	super(props);
 	this.state = {
 		enablePriority: true
 	}
 }

 handleChange = (event, item) => {
	this.setState({
	  [item]: event.target.checked
	});
 }

 render() {
    return (
        <div className="header-icons">
          <Checkbox className="priority-checkbox" checked={this.state.enablePriority} onChange={(event) => this.handleChange(event, "enablePriority")}>
      	  	Enable Signal Priority
      	  </Checkbox>
          <div className="action-button-container">
            <button>
              <i className="fa fa-trash"></i>
            </button>
          </div>
          <div className="action-button-container">
            <button>
              <i className="fa fa-play"></i>
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
