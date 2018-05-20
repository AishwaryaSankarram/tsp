import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import srmIcon from "../images/srm-flag";
import { color_codes } from '../constants';

// let google = window.google;

export class SRMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      srmData: [{
        "Current_Lon": 80.252628667,
        "Speed": 0.206,
        "Msg_type": "SRM",
        "Request_id": 100,
        "Device_Type": "OBU",
        "count": 314,
        "Direction": "TX",
        "Current_Lat": 13.048906167,
        "Msg_Data": {
          "dsecond": 1,
          "srm_list": [{
            "duration": 30,
            "min_of_year": 0,
            "Signal_Request": {
              "IntersectionId": 0,
              "Request_Type": 1,
              "Request_id": 100,
              "Inbound LaneId": 0
            },
            "second": 0
          }],
          "Requestor": {
            "Role": 0,
            "Sub Role": 0,
            "Vehicle_Id": 1234,
            "Imp Role": 0
          },
          "msg_count": 1,
          "timestamp": 0
        },
        "timestamp": 1526456326315
      }]
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
    //console.info("SRM Info received in event", "srm", data);

    this.processSRM(JSON.parse(data));
  }

  clearData() {
    //console.log("CLEARING FROM SRM MARKERS COMPONENT");
    this.setState({srmData: []});
  }

  processSRM(data) {
    // let map = this.props.mapObj;
    // let latLng = new google.maps.LatLng({lat: data.Current_Lat, lng: data.Current_Lon});
    // map.panTo(latLng);
    let currentMarkers = this.state.srmData;
    if (currentMarkers[currentMarkers.length - 1].Current_Lat !== data.Current_Lat || currentMarkers[currentMarkers.length - 1].Current_Lon !== data.Current_Lon ){
      currentMarkers.unshift(data);
      if(currentMarkers.length > 3)
        currentMarkers.pop();
      this.setState({ srmData: currentMarkers });
    }
    let content =  " with request ID " +  data.Request_id + " sent by " + data.Msg_Data.Requestor.Vehicle_Id + " at " + data.Current_Lat + ", " + data.Current_Lon ;
    let logInfo = {className: "srm-text", timestamp: new Date(data.timestamp).toLocaleString(), label: "SRM", content: content }
    this.props.addLogs(logInfo);
  }


  handleClick(data){
    console.log("Click on SRM --", data);
    this.props.fetchSSM(data);
  }

  render() {
    let currentMarkers = this.state.srmData;
    let markers = currentMarkers.map((data, index) => {
      let pos = {lat: data.Current_Lat, lng: data.Current_Lon};

      let srmFlag = srmIcon.replace(/fillColor/g, (color_codes[index % 10]));
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
