import React, { Component } from 'react';
import { Marker, Polygon } from 'react-google-maps';
// import InterIcon from '../images/intersection-icon';
import SignalInterIcon from '../images/signal-intersection-icon'
import { toast } from 'react-toastify';
import '../css/inter-markers.css';

window.signalToInt = {};

let signalColorsAndShadows = ["#2BBF60", "#3CCE6C", "#EAB42D", "#EDCB3B", "#EA4949", "#F25F5F"];

export class InterMarkers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signalToIntMap: {}
    };

    this.updateIntersections = this.updateIntersections.bind(this);
    this.displayMapData = this.displayMapData.bind(this);
    this.isecIdToLabelMap = {}
  }

  componentDidMount() {
    let self = this;
    let webSocket = window.socket;
    this.props.onMount(this);
    //webSocket.on("mapData", self.displayMapData);
    // webSocket.on("mockMap", self.updateIntersections);
    webSocket.on('map', self.updateIntersections);

  }

  componentWillUnmount() {
    this.props.onMount(null);
  }

  updateSignalData(color, isec_id) {
    // console.log("COLOR ->", color);
    let signalToIntMap = this.state.signalToIntMap;
    // console.log("SIGNAL TO INT MAP", signalToIntMap[isec_id]);
    if(signalToIntMap[isec_id]) {
      if(color === "red") {
        signalToIntMap[isec_id].redShadow = signalColorsAndShadows[5];
        signalToIntMap[isec_id].red = signalColorsAndShadows[4];
        signalToIntMap[isec_id].yellowShadow = "#DCDCDC"
        signalToIntMap[isec_id].yellow = "#DCDCDC"
        signalToIntMap[isec_id].greenShadow = "#DCDCDC"
        signalToIntMap[isec_id].green = "#DCDCDC"
      } else if (color === "yellow") {
        signalToIntMap[isec_id].yellowShadow = signalColorsAndShadows[3];
        signalToIntMap[isec_id].yellow = signalColorsAndShadows[2];
        signalToIntMap[isec_id].redShadow = "#DCDCDC"
        signalToIntMap[isec_id].red = "#DCDCDC"
        signalToIntMap[isec_id].greenShadow = "#DCDCDC"
        signalToIntMap[isec_id].green = "#DCDCDC"
      } else if (color === "green") {
        signalToIntMap[isec_id].greenShadow = signalColorsAndShadows[1];
        signalToIntMap[isec_id].green = signalColorsAndShadows[0];
        signalToIntMap[isec_id].yellowShadow = "#DCDCDC"
        signalToIntMap[isec_id].yellow = "#DCDCDC"
        signalToIntMap[isec_id].redShadow = "#DCDCDC"
        signalToIntMap[isec_id].red = "#DCDCDC"
      }
    }
    this.setState({signalToIntMap: signalToIntMap});
  }

  clearSignal(isec_id) {
    let signalToIntMap = this.state.signalToIntMap;
    if(signalToIntMap[isec_id]){
      signalToIntMap[isec_id].greenShadow = "#DCDCDC";
      signalToIntMap[isec_id].green = "#DCDCDC";
      signalToIntMap[isec_id].yellowShadow = "#DCDCDC";
      signalToIntMap[isec_id].yellow = "#DCDCDC";
      signalToIntMap[isec_id].redShadow = "#DCDCDC";
      signalToIntMap[isec_id].red = "#DCDCDC";
      this.setState({signalToIntMap: signalToIntMap});
    }
  }

  displayMapData(data){
    // console.info("mapData received in event", "mapData", data);
  }

  clearData() {
    let signalToIntMap = this.state.signalToIntMap;
    Object.values(signalToIntMap).forEach((mapData) => {
      mapData.zone_array = [];
      mapData.lane_array = [];
      mapData.isec_lat = null;
      mapData.isec_lng = null;
    })
    this.setState({signalToIntMap: signalToIntMap});
  }

  updateIntersections(mapData) {
    let data = JSON.parse(mapData);

    // console.log("MAP DATA JSON =>", data);
    let oldSignalToIntMap = this.state.signalToIntMap;


       //Show Notifications only in case of a lane change/ intersection change;
       toast.info('Entering Map Zone...', {
          position: toast.POSITION.TOP_LEFT,
          className: 'toastify-map',
          bodyClassName: 'toastify-text',
          progressClassName: 'toastify-progress',
          autoClose: 10000
        });

       if(!this.isecIdToLabelMap[data.isec_id]) {
         let noOfElements = Object.keys(this.isecIdToLabelMap).length;
         let chr = String.fromCharCode(65+noOfElements);
         this.isecIdToLabelMap[data.isec_id] = chr;
       }
      if(!oldSignalToIntMap[data.isec_id]){
        oldSignalToIntMap[data.isec_id] = data;
        oldSignalToIntMap[data.isec_id].label = this.isecIdToLabelMap[data.isec_id];
        oldSignalToIntMap[data.isec_id].red = "#DCDCDC"
        oldSignalToIntMap[data.isec_id].redShadow = "#DCDCDC"
        oldSignalToIntMap[data.isec_id].yellow = "#DCDCDC"
        oldSignalToIntMap[data.isec_id].yellowShadow = "#DCDCDC"
        oldSignalToIntMap[data.isec_id].green = "#DCDCDC"
        oldSignalToIntMap[data.isec_id].greenShadow = "#DCDCDC"
      }
       
      let notification = "Vehicle is at lane " + data.veh_lane_id + " and entered MAP zone for intersection " + data.isec_id + " with approach having " + data.no_of_lanes + " lane(s).";
      this.props.showNotifications(notification);


    let content =  "MAP data with intersection ID " +  data.isec_id + " sent by RSU at " + data.isec_lat + ", " + data.isec_lng + " for vehicle ID " + data.vehicle_id;
    let logInfo = {className: "map-text", timestamp: data.timestamp, label: "MAP", content: content };

    this.props.addLogs(logInfo);
    this.setState({signalToIntMap: oldSignalToIntMap});
    this.props.signalpanel.intersectionToSignalMap(oldSignalToIntMap, data);

  }

  render() {
    let mapDataValues = Object.values(this.state.signalToIntMap);

    let markers = mapDataValues.map( (mapData, index) => {
        let iconImg = SignalInterIcon;
        let zoneArray = mapData.zone_array;
        let laneArray = mapData.lane_array;
        // console.log("ZONE_ARRAY =>", zoneArray);
        // console.log("LANE_ARRAY =>", laneArray);
        let mapZoneOptions = {fillColor: "#A0522D", fillOpacity: 0.5, strokeWeight: 0.5};
        let laneZoneOptions = {fillColor:"#191970", fillOpacity: 1, strokeWeight: 1.5};
        let pos = {lat: mapData.isec_lat, lng: mapData.isec_lng, title: mapData.label};
        iconImg = iconImg.replace(/label/g, pos.title);
        iconImg = iconImg.replace(/redshadow/g, mapData.redShadow).replace(/red/g, mapData.red).replace(/yellowshadow/g, mapData.yellowShadow).replace(/yellow/g, mapData.yellow).replace(/greenshadow/g, mapData.greenShadow).replace(/green/g, mapData.green);
        let icon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconImg),
                       scaledSize: new window.google.maps.Size(100, 100),
                       /*anchor: new window.google.maps.Point(0,0)*/
                      };
        return (
          <div key={"div-isec_" + index}>
          {pos.lat && pos.lng && <Marker key={"i-marker_" + index} position={pos} title={pos.title.toString()} icon={icon} />}
          <Polygon key={"poly-map_" + index} path={zoneArray} options={mapZoneOptions}  />
          <Polygon key={"poly-lane_" + index} path={laneArray} options={laneZoneOptions}  />
          </div>
        );
    });

    return (
      <div>
        {markers}
      </div>
    );

  }




}
