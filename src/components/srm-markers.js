import React, {Component} from 'react';
import { Marker } from "react-google-maps";

export class SRMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      srmMarkers: []
    };

    this.processSRM = this.processSRM.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    let webSocket = window.socket;
    webSocket.on('srmData', this.processSSM)
  }

  processSRM(data) {
    let currentMarkers = this.state.srmMarkers;
    this.currentMarkers.push(data);
    this.setState({srmMarkers: currentMarkers});
  }


  handleClick(id){
    console.log("Click on SRM --", id);
  }

  render() {
    let currentMarkers = this.state.srmMarkers;
    let markers = currentMarkers.map((pos, index) => {
      return (
        <Marker key={index} pos={pos} draggable={false} onClick={(id) => {this.handleClick(pos.id)} } />
      );
    });

    return (
      <div>{markers}</div>;
    )

  }
}
