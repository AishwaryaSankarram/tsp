import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import srmIcon from "../images/srm-flag";
import { color_codes } from '../constants';

// let google = window.google;

let count = 0;

export class SRMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      srmData: {}
    };

    this.displaySRM = this.displaySRM.bind(this);
    this.processSRM = this.processSRM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount(){
    this.props.onMount(this);
    let webSocket = window.socket;
    //webSocket.on('srmData', this.processSSM);
    webSocket.on('srm', this.displaySRM);
  }

  componentWillUnmount() {
    this.props.onMount(null);
  }

  displaySRM(data){
    console.info("SRM Info received in event", "srm", data);

    this.processSRM(JSON.parse(data));
  }

  clearData() {
    //console.log("CLEARING FROM SRM MARKERS COMPONENT");
    this.setState({srmData: {}});
  }

  processSRM(data) {
    let currentSrmData = this.state.srmData;
    currentSrmData[data.Request_id] = data;
    currentSrmData[data.Request_id].color = color_codes[count % 10];
    this.setState({srmData: currentSrmData});
    let content =  " with request ID " +  data.Request_id + " sent by " + data.Msg_Data.Requestor.Vehicle_Id + " at " + data.Current_Lat + ", " + data.Current_Lon ;
    let logInfo = {className: "srm-text", timestamp: data.timestamp, label: "SRM", content: content }
    count += 1;
    this.props.addLogs(logInfo);
  }


  handleClick(data){
    console.log("Click on SRM --", data);
    this.props.fetchSSM(data);
  }

  render() {
    let currentMarkers = Object.values(this.state.srmData);
    let markers = currentMarkers.map((data, index) => {
      let pos = {lat: data.Current_Lat, lng: data.Current_Lon};

      let srmFlag = srmIcon.replace(/fillColor/g, data.color);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(srmFlag),
        scaledSize: new window.google.maps.Size(50, 50),
        anchor: new window.google.maps.Point(0,50)
      };
      return (
        <Marker key={"srm_" + index} position={pos} draggable={false} onClick={(id) => {this.handleClick(data)} } icon={icon} />
      );
    });

    return (
      <div>{markers}</div>
    );

  }
}
