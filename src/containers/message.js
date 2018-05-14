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

  componentDidMount() {
    this.props.onMessageMount(this);
  }

  updateMessage(obj) {
    this.setState({id: obj.id, type: obj.type, message: obj.message});
  }

  componentWillUnmount() {
    this.props.onMessageMount(null);
  }

  render() {

    return (
      <div className="message-container">
        <div className="message-header"><label>Message Details</label></div>
        <div className="content">
            <label>ID: </label> {this.state.id}<br/>
            <label>Type: </label> {this.state.type} <br/>
            <label>Message: </label> {this.state.message} <br/>
        </div>
      </div>
    );
  }
}
