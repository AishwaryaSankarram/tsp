import React, {Component} from 'react';
import '../css/message.css';


export class MessageContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      type: "SRM",
      message: "This is our message..."
    }
  }

  render() {

    return (
      <div className="message-container">
        <label className="message-header"> Message Details </label>
        <hr/>
        ID: {this.state.id}<br/>
        Type: {this.state.type} <br/>
        Message: {this.state.message} <br/>

      </div>
    );
  }
}
