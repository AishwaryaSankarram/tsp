import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import ssmIcon from "../images/ssm-flag";
import { color_codes } from '../constants';

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmInfo: [{ Current_Lat: 42.3416928, Current_Lon: -83.0790249, deviceType: 0, Request_id: 789 },
        { Current_Lat: 42.3350748, Current_Lon: -83.0494584, deviceType: 1, Request_id: 100 }]
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
    webSocket.on('ssm', this.displaySSM);
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
    let currentMarkers = this.state.ssmInfo;
    currentMarkers.push(data);
    this.setState({ssmInfo: currentMarkers});
  }

  handleClick(data){
    console.log("On click SSM------", data);
    this.props.fetchSRM(data);
  }

  render() {
    let currentMarkers = this.state.ssmInfo;
    let google = window.google;
    let markers = currentMarkers.map((pos, index) => {
      let ssmFlag = ssmIcon.replace(/fillColor/g, color_codes[index % 10]);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(ssmFlag),
        scaledSize: new google.maps.Size(100, 100)
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
