import React, {Component} from 'react';
import { Signal } from '../components/signal';
import '../css/signal-panel.css';
import FloatingActionButton from 'material-ui';


export class SignalPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {socketData: {},
                  intToSignalMap: {}
                };

    this.renderSignals = this.renderSignals.bind(this);
    this.intersectionToSignalMap = this.intersectionToSignalMap.bind(this);
  }

  componentDidMount() {
    let self = this;
    this.props.onSignalPanelMount(this);
    let webSocket = window.socket
    webSocket.on('signal', self.renderSignals);
  }

  intersectionToSignalMap(obj) {
    this.setState({intToSignalMap: obj});
  }

  renderSignals(data) {
    let parsedData = JSON.parse(data);
    let oldSocketData = this.state.socketData;
    oldSocketData[parsedData.id] = parsedData.east;
    this.setState({ socketData: oldSocketData });

  }



  render() {
    let currentSocketValues = Object.values(this.state.socketData);

    let self = this;

    let signals = currentSocketValues.map((data, index) => {

        return (
          <li title={self.state.intToSignalMap[Object.keys(self.state.socketData)[index]]} className="signal" key={"signal-li_" + index}>
            <button variant="raised" color="primary">+</button>
            <Signal key={index} data={data} />
          </li>
        );
    });

    return (
      <div className="signal-panel"><ul key="signal-list" className="signalPanel">{signals}</ul></div>
    );

  }
}
