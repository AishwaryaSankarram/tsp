import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import srmIcon from "../images/srm-flag";
import { enableSRM } from '../constants';
import { toast } from 'react-toastify';

// let google = window.google;


export class SRMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      srmData: {},
      enabled: enableSRM
    };

    this.displaySRM = this.displaySRM.bind(this);
    this.processSRM = this.processSRM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearData = this.clearData.bind(this);
    this.enable = this.enable.bind(this);
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

  enable(state) {
    // console.log("CURRENT SRM STATE =>", state);
    this.setState({enabled: state});
  }

  displaySRM(data){
    // console.info("SRM Info received in event", "srm", data);

    this.processSRM(JSON.parse(data));
  }

  clearData() {
    //console.log("CLEARING FROM SRM MARKERS COMPONENT");
    this.setState({srmData: {}});
  }

  processSRM(data) {
    let currentSrmData = this.state.srmData;
    let requestIDs = Object.keys(currentSrmData);
    // console.log("REQUEST IDS", requestIDs)
    if(!requestIDs.includes(data.Request_id.toString())) {
      // console.log("GENERATING REQUEST TOAST");
      let toastID = toast.info("Signal Request Sent to RSU", {
         position: toast.POSITION.TOP_LEFT,
         autoClose: 10000
       });
       currentSrmData[data.Request_id] = data;
       currentSrmData[data.Request_id].count = 1;
       this.props.srmsent(toastID, data.Request_id);
    } else {
      let count = currentSrmData[data.Request_id].count + 1;
      let string = "Signal Request Sent to RSU (" + count + ")";
      this.props.updatesrm(data.Request_id, string);

      // let toastID = toast.info(string, {
      //    position: toast.POSITION.TOP_LEFT,
      //    autoClose: 3000
      //  });
       currentSrmData[data.Request_id] = data;
       currentSrmData[data.Request_id].count = count;

    }
    this.setState({srmData: currentSrmData});
    let content =  " with request ID " +  data.Request_id + " sent by " + data.vehicle_id + " at " + data.Current_Lat + ", " + data.Current_Lon ;
    let logInfo = {className: "srm-text", timestamp: data.timestamp, label: "SRM", content: content }
    let notification = "Signal Access Request with ID " + data.Request_id + " has been sent by vehicle " + data.vehicle_id + ".";
    this.props.showNotifications(notification);
    this.props.addLogs(logInfo);
  }


  handleClick(data){
    // console.log("Click on SRM --", data);
    this.props.fetchSSM(data);
  }

  render() {
    let currentMarkers = Object.values(this.state.srmData);
    let markers = currentMarkers.map((data, index) => {
      let pos = {lat: data.Current_Lat, lng: data.Current_Lon};
      let countHtml='';
      if(data.count > 10){
        countHtml = '<text id="22" font-family="Poppins-Medium, Poppins" font-size="48" font-weight="700" fill="#FFFFFF"><tspan x="165" y="40">'  + data.count + '</tspan></text>';
      }else{
        countHtml = '<text id="22" font-family="Poppins-Medium, Poppins" font-size="60" font-weight="700" fill="#FFFFFF"><tspan x="175" y="50">' + data.count + '</tspan></text>';
      }
      let srmFlag = srmIcon.replace(/fillColor/g, data.color).replace(/count/g, countHtml);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(srmFlag),
        scaledSize: new window.google.maps.Size(100, 100),
        anchor: new window.google.maps.Point(0,100)
      };
      return (
        <Marker key={"srm_" + index} title={"SRM - " + data.count.toString()} position={pos} draggable={false} icon={icon} />
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
