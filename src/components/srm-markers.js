import React, {Component} from 'react';
import { Marker } from "react-google-maps";

export class SRMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      srmMarkers: [{ lat: 42.331280891921075, lng: -83.0733836184375, id: 789, deviceType: 0 }]
    };

    this.displaySRM = this.displaySRM.bind(this);
    this.processSRM = this.processSRM.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    let webSocket = window.socket;
    webSocket.on('srmData', this.processSSM);
    webSocket.on('srm', this.displaySRM);
  }

  displaySRM(data){
    console.info("SRM Info received in event", "srm", data);
  }

  processSRM(data) {
    let currentMarkers = this.state.srmMarkers;
    this.currentMarkers.push(data);
    this.setState({srmMarkers: currentMarkers});
  }


  handleClick(id){
    console.log("Click on SRM --", id);
    this.props.logs.openTabs("srm", id);
  }

  render() {
    let currentMarkers = this.state.srmMarkers;
    let markers = currentMarkers.map((pos, index) => {
      return (
        <Marker key={index} position={pos} draggable={false} onClick={(id) => {this.handleClick(pos)} } />
      );
    });

    return (
      <div>{markers}</div>
    );

  }
}
