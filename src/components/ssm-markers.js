import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import ssmIcon from "../images/ssm-flag";
import { color_codes } from '../constants';

let count = 0;

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmInfo: {}
    };

    this.processSSM = this.processSSM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displaySSM = this.displaySSM.bind(this);
    this.clearData = this.clearData.bind(this);
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
    this.setState({ssmInfo: {}});
  }

  processSSM(data) {
    console.log("SSm Data arrived----", data, typeof data);
    let parsedData = JSON.parse(data);
    let currentSsmInfo = this.state.ssmInfo;
    currentSsmInfo[parsedData.Request_id] = parsedData;
    currentSsmInfo[parsedData.Request_id].color = color_codes[count % 10];
    this.setState({ssmInfo: currentSsmInfo});
    let content =  " with request ID " +  parsedData.Request_id + " sent by RSU at " + parsedData.Current_Lat + ", " + parsedData.Current_Lon + " to vehicle with ID " + parsedData.Vehicle_Id  ;
    let logInfo = {className: "ssm-text", timestamp: parsedData.timestamp, label: "SSM", content: content};
    count += 1;
    this.props.addLogs(logInfo);
  }

  handleClick(data){
    console.log("On click SSM------", data);
    this.props.fetchSRM(data);
  }

  render() {
    let currentMarkers = Object.values(this.state.ssmInfo);
    console.log("SSM MARKERS =>", currentMarkers);
    console.log("COLOR CODES ", color_codes);
    let markers = currentMarkers.map((pos, index) => {
      let ssmFlag = ssmIcon.replace(/fillColor/g, pos.color);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(ssmFlag),
        scaledSize: new window.google.maps.Size(50, 50),
        anchor: new window.google.maps.Point(0,50)
      };
      let p = { lat: pos.Current_Lat, lng: pos.Current_Lon };
      return (
        <Marker key={index} position={p} draggable={false} onClick={id => this.handleClick(pos)} icon={icon} />
        );
    });

    return (
      <div>{markers}</div>
    );

  }
}
