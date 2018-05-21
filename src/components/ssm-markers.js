import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import ssmIcon from "../images/ssm-flag";
import { color_codes } from '../constants';

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmInfo: [{ Current_Lat: 42.3416928, Current_Lon: -83.0790249, deviceType: 0, timestamp: 1526869831000, Request_id: 789, Msg_Data: {ssm_list: [{IntersectionId: 6}]}},
        { Current_Lat: 42.3350748, Current_Lon: -83.0494584, deviceType: 1, timestamp: 1526869831000, Request_id: 100, Msg_Data: {ssm_list: [{IntersectionId: 6}] }} ]
    };

    this.processSSM = this.processSSM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displaySSM = this.displaySSM.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount(){
    this.props.onMount(this);
    let webSocket = window.socket;
    // webSocket.on('ssm', this.processSSM);
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

  processSSM(data) {
    console.log("SSm Data arrived----", data, typeof data);
    let parsedData = JSON.parse(data);
    let currentMarkers = this.state.ssmInfo;
    currentMarkers.push(parsedData);
    this.setState({ssmInfo: currentMarkers});
    let content =  " with request ID " +  parsedData.Request_id + " sent by RSU at " + parsedData.Current_Lat + ", " + parsedData.Current_Lon ;
    let logInfo = {className: "ssm-text", timestamp: parsedData.timestamp, label: "SSM", content: content }
    this.props.addLogs(logInfo);
  }

  handleClick(data){
    console.log("On click SSM------", data);
    this.props.fetchSRM(data);
  }

  render() {
    let currentMarkers = this.state.ssmInfo;
    let markers = currentMarkers.map((pos, index) => {
      let ssmFlag = ssmIcon.replace(/fillColor/g, color_codes[index % 10]);
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
