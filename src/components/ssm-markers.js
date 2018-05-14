import React, {Component} from 'react';
import { Marker } from "react-google-maps";

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmMarkers: []
    };

    this.processSSM = this.processSSM.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    let webSocket = window.socket;
    webSocket.on('ssm', this.processSSM);
  }

  processSSM(data) {
    console.log("SSm Data arrived----", data, typeof data);
    let currentMarkers = this.state.ssmMarkers;
    currentMarkers.push(data);
    this.setState({ssmMarkers: currentMarkers});
  }

  handleClick(id){
    console.log("On click SSM------", id);
  }

  render() {
    let currentMarkers = this.state.ssmMarkers;
    let markers = currentMarkers.map((pos, index) => {
      return (
        <Marker key={index} pos={pos} draggable={false} onClick={id => this.handleClick(pos.id)} />
        );
    });

    return (
      <div>{markers}</div>
    );

  }
}
