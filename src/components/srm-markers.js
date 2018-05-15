import React, {Component} from 'react';
import { Marker } from "react-google-maps";

export class SRMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      srmData: []
    };

    this.displaySRM = this.displaySRM.bind(this);
    this.processSRM = this.processSRM.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    console.log("SRM COMPONENT MOUNTED -----");
    let webSocket = window.socket;
    //webSocket.on('srmData', this.processSSM);
    webSocket.on('srm', this.displaySRM);
  }

  displaySRM(data){
    console.info("SRM Info received in event", "srm", data);

    this.processSRM(data);
  }

  processSRM(data) {
    let currentMarkers = this.state.srmData;
    currentMarkers.push(data);
    this.setState({srmData: currentMarkers});
  }


  handleClick(id){
    console.log("Click on SRM --", id);
  }

  render() {
    let currentMarkers = this.state.srmData;
    let markers = currentMarkers.map((data, index) => {
      let pos = {lat: data.Current_Lat, lng: data.Current_Lon}
      return (
        <Marker key={index} pos={pos} draggable={false} onClick={(id) => {this.handleClick(data.id)} } />
      );
    });

    return (
      <div>{markers}</div>
    );

  }
}
