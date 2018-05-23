import React, {Component} from 'react';
import {Checkbox} from "react-bootstrap";
import '../css/header.css';

export class SettingsPopover extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, eventName) {

    if(eventName === "SRM") {
      this.props.srmenableaction(event.target.checked);
    } else if(eventName === "SSM") {
      this.props.ssmenableaction(event.target.checked);
    }

  }

  render() {

    return(
      <div>
        <ul className="checkbox-list">
          <li><Checkbox checked={this.props.srmenable} onChange={(event) => this.handleChange(event, "SRM")} >View SRMs</Checkbox></li>
          <li><Checkbox checked={this.props.ssmenable} onChange={(event) => this.handleChange(event, "SSM")}>View SSMs</Checkbox></li>
        </ul>
      </div>
    );
  }
}
