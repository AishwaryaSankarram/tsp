import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import ssmIcon from "../images/ssm-flag";
import { enableSSM } from '../constants';
import { toast } from 'react-toastify';

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmInfo: {},
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
    this.setState({ssmInfo: {}});
  }

  enable(state) {
    // console.log("CURRENT SSM STATE =>", state);
    this.setState({enabled: state});
  }

  processSSM(ssmData) {
    // console.log("SSM Data arrived----", data);

    let data = JSON.parse(ssmData);
    let ssmInfo = this.state.ssmInfo;
    let requestIDs = Object.keys(ssmInfo);
    let key = data.Request_id.toString() + '_' + data.status;
    let status = data.status;
    let toastID;
    data.status === "granted" ? data.color = "green" :  data.color = "red";
    if(!requestIDs.includes(key)) { //Initial toast
       if(status === "granted") {
				  toastID = toast.success("Signal Request " + data.status + "!", {
	         position: toast.POSITION.TOP_LEFT,
	         autoClose: 10000
	       });
			} else {
				  toastID = toast.error("Signal Request " + data.status + "!", {
	         position: toast.POSITION.TOP_LEFT,
	         autoClose: 10000
	       });
			}
       ssmInfo[key] = data;
       ssmInfo[key].count = 1;
       this.props.ssmsent(toastID, key);
    } else {
      let count = ssmInfo[key].count + 1;
      let toast = "Signal Request " + status + "! (" + count +  " )";
      this.props.updatessm(key, toast);
      ssmInfo[key] = data;
      ssmInfo[key].count = count;
    }
    this.setState({ssmInfo: ssmInfo});
    let content = " with request ID " + data.Request_id + " sent by RSU at " + data.Current_Lat + ", " + data.Current_Lon + " to vehicle with ID " + data.vehicle_id  ;
    let logInfo = {className: "ssm-text", timestamp: data.timestamp, label: "SSM", content: content};
    this.props.addLogs(logInfo);
    let notification = "Signal Access Request for " + data.Request_id + " has been granted by RSU for " + data.vehicle_id + ".";
    this.props.showNotifications(notification);
  }

  handleClick(data){
    // console.log("On click SSM------", data);
    this.props.fetchSRM(data);
  }

  render() {
    let currentMarkers = Object.values(this.state.ssmInfo);
    // console.log("SSM MARKERS =>", currentMarkers);
    let markers = currentMarkers.map((pos, index) => {
      let countHtml='';
      if(pos.count > 10){
        countHtml = '<text id="22" font-family="Poppins-Medium, Poppins" font-size="48" font-weight="700" fill="#FFFFFF"><tspan x="165" y="40">'  + pos.count + '</tspan></text>';
      }else{
        countHtml = '<text id="22" font-family="Poppins-Medium, Poppins" font-size="60" font-weight="700" fill="#FFFFFF"><tspan x="175" y="50">' + pos.count + '</tspan></text>';
      }
      let ssmFlag = ssmIcon.replace(/fillColor/g, pos.color).replace(/count/g, countHtml);
      let icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(ssmFlag),
        scaledSize: new window.google.maps.Size(75, 75),
        anchor: new window.google.maps.Point(0,75)
      };
      let p = { lat: pos.Current_Lat, lng: pos.Current_Lon };
      return (
        <Marker key={index} position={p} draggable={false} icon={icon} />
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
