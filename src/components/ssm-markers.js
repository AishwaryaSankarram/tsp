import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import ssmIcon from "../images/ssm-flag";
import { color_codes } from '../constants';

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmInfo: [{ lat: 42.3416928, lng: -83.0790249, deviceType: 0, id: 789 }, { lat: 42.3350748, lng: -83.0494584, deviceType: 1, id: 987 }]
    };

    this.processSSM = this.processSSM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displaySSM = this.displaySSM.bind(this);
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
    console.info("SSM Info received in event", "ssm", data);
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
      let ssmFlag = ssmIcon.replace(/fillColor/g, color_codes[index]);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(ssmFlag),
        scaledSize: new google.maps.Size(100, 100), anchor: new google.maps.Point(0, 0)
      };
      return (
        <Marker key={index} position={pos} draggable={false} onClick={id => this.handleClick(pos)} icon={icon} />
        );
    });

    return (
      <div>{markers}</div>
    );

  }
}
