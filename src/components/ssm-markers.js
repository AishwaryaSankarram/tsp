import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import ssmIcon from "../images/ssm-flag";
import { enableSSM } from '../constants';

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmInfo: [],
      enabled: enableSSM
    };

    this.processSSM = this.processSSM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displaySSM = this.displaySSM.bind(this);
    this.clearData = this.clearData.bind(this);
    this.enable = this.enable.bind(this);
  }

  componentDidMount(){
    this.props.onMount(this);
    let webSocket = window.socket;
    webSocket.on('ssm', this.processSSM);
  }

  componentWillUnmount() {
    this.props.onMount(null);
  }

  displaySSM(data) {
    //console.info("SSM Info received in event", "ssm", data);
  }

  clearData() {
    //console.log("CLEARING FROM SSM MARKERS COMPONENT");
    this.setState({ssmInfo: []});
  }

  enable(state) {
    // console.log("CURRENT SSM STATE =>", state);
    this.setState({enabled: state});
  }

  processSSM(data) {
    // console.log("SSM Data arrived----", data);
    let parsedData = JSON.parse(data);
    let currentSsmInfo = parsedData;
    let ssmInfo = this.state.ssmInfo;
    this.props.ssmsent(parsedData.Request_id, parsedData.status);
    parsedData.status === "granted" ? currentSsmInfo.color = "green" :  currentSsmInfo.color = "red";
    ssmInfo.push(parsedData);
    this.setState({ssmInfo: ssmInfo});
    let content = " with request ID " + parsedData.Request_id + " sent by RSU at " + parsedData.Current_Lat + ", " + parsedData.Current_Lon + " to vehicle with ID " + parsedData.vehicle_id  ;
    let logInfo = {className: "ssm-text", timestamp: parsedData.timestamp, label: "SSM", content: content};
    this.props.addLogs(logInfo);
    let notification = "Signal Access Request for " + parsedData.Request_id + " has been granted by RSU for " + parsedData.vehicle_id + ".";
    this.props.showNotifications(notification);
  }

  handleClick(data){
    // console.log("On click SSM------", data);
    this.props.fetchSRM(data);
  }

  render() {
    let currentMarkers = this.state.ssmInfo;
    // console.log("SSM MARKERS =>", currentMarkers);
    let markers = currentMarkers.map((pos, index) => {
      let ssmFlag = ssmIcon.replace(/fillColor/g, pos.color);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(ssmFlag),
        scaledSize: new window.google.maps.Size(50, 50)
      };
      let p = { lat: pos.Current_Lat, lng: pos.Current_Lon };
      return (
        <Marker key={index} position={p} draggable={false} onClick={id => this.handleClick(pos)} icon={icon} />
        );
    });

    if(this.state.enabled) {
      return (
        <div>{markers}</div>
      );
    } else {
      return (
        <div></div>
      );
    }



  }
}
