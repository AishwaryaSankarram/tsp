import React, {Component} from 'react';

class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmMarkers: []
    }

    this.processSSM = this.processSSM.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    let webSocket = window.socket;
    webSocket.on('ssmData', this.processSSM)
  }

  processSSM(data) {
    let currentMarkers = this.state.ssmMarkers;
    this.currentMarkers.push(data);
    this.setState({ssmMarkers: currentMarkers});
  }


  render() {
    let currentMarkers = this.state.ssmMarkers;
    let markers = currentMarkers.map((pos, index) => {
      return (
        <Marker key={index} pos={pos} draggable={false} onClick={(pos.id) => this.handleClick(pos.id)} />
        );
    });

    return (
      <div>{markers}</div>
    );

  }
}
