import React, {Component} from 'react';
import { Signal } from '../components/signal';
import '../css/signal-panel.css';
import FloatingActionButton from 'material-ui';


export class SignalPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {socketData: {}};

    this.renderSignals = this.renderSignals.bind(this);
  }

  componentDidMount() {
    let self = this;
    let webSocket = window.socket
    webSocket.on('signal', self.renderSignals);
  }

  renderSignals(data) {
    let parsedData = JSON.parse(data);
    console.log("DATA => ", parsedData);
    let oldSocketData = this.state.socketData;
    oldSocketData[parsedData.id] = parsedData.east;
    this.setState({ socketData: oldSocketData });
    console.log("SOCKETDATA", this.state.socketData);

  }



  render() {
    let currentSocketValues = Object.values(this.state.socketData);

    let signals = currentSocketValues.map((data, index) => {
        return (
          <li className="signal">
            <Signal key={index} data={data} />
            <button variant="raised" color="primary">+</button>
          </li>
        );
    });

    return (
      <div className="signal-panel"><ul key="signal-list" className="signalPanel">{signals}</ul></div>
    );

  }
}
