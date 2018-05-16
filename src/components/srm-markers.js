import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import srmIcon from "../images/srm-flag";
import { color_codes } from '../constants';

let google = window.google;

export class SRMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      srmData: [{ Current_Lat: 42.331280891921075, Current_Lon: -83.0733836184375, id: 789, deviceType: 0 }]
    };

    this.displaySRM = this.displaySRM.bind(this);
    this.processSRM = this.processSRM.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    console.log("SRM COMPONENT MOUNTED -----");
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

  processSRM(data) {
    let map = this.props.mapObj;
    console.log("TYPE OF LAT", typeof(data["Current_Lat"]));
    let latLng = new google.maps.LatLng({lat: data.Current_Lat, lng: data.Current_Lon});
    map.panTo(latLng);
    let currentMarkers = this.state.srmData;
    currentMarkers.push(data);
    this.setState({srmData: currentMarkers});
  }


  handleClick(id){
    console.log("Click on SRM --", id);
    this.props.logs("srm", id);
  }

  render() {
    let currentMarkers = this.state.srmData;
    let google = window.google;
    let markers = currentMarkers.map((data, index) => {
      let pos = {lat: data.Current_Lat, lng: data.Current_Lon};
      let srmFlag = srmIcon.replace(/fillColor/g, color_codes[index]);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(srmFlag),
        scaledSize: new google.maps.Size(100, 100), anchor: new google.maps.Point(0, 0)
      };
      return (
        <Marker key={index} position={pos} draggable={false} onClick={(id) => {this.handleClick(data)} } icon={icon} />
      );
    });

    return (
      <div>{markers}</div>
    );

  }
}
