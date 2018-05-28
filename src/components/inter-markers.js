import React, { Component } from 'react';
import { Marker, Polygon } from 'react-google-maps';
// import InterIcon from '../images/intersection-icon';
import SignalInterIcon from '../images/signal-intersection-icon'
import { toast } from 'react-toastify';

window.signalToInt = {};

export class InterMarkers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signalToIntMap: {}
    };

    this.updateIntersections = this.updateIntersections.bind(this);
    this.displayMapData = this.displayMapData.bind(this);
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

  displayMapData(data){
    // console.info("mapData received in event", "mapData", data);
  }

  clearData() {
    this.setState({signalToIntMap: {} });
  }

  updateIntersections(mapData) {
    let data = JSON.parse(mapData);

    // console.log("MAP DATA JSON =>", data);
    let oldSignalToIntMap = this.state.signalToIntMap;
    let noOfElements = Object.keys(oldSignalToIntMap).length;
    let chr = String.fromCharCode(65+noOfElements);
    if (!oldSignalToIntMap[data.isec_id] || oldSignalToIntMap[data.isec_id].veh_lane_id !== data.veh_lane_id) {

       //Show Notifications only in case of a lane change/ intersection change;
       toast.info("Entering Map Zone", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000
        });
       oldSignalToIntMap[data.isec_id] = data;

      let notification = "Vehicle is at lane " + data.veh_lane_id + " and entered MAP zone for intersection " + data.isec_id + " with approach having " + data.no_of_lanes + " lane(s).";
      this.props.showNotifications(notification);
    }
    oldSignalToIntMap[data.isec_id].label = chr;
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
        let mapZoneOptions = {fillColor: "#8B0000", fillOpacity: 0.5, strokeWeight: 0.5};
        let laneZoneOptions = {fillColor:"#191970", fillOpacity: 1, strokeWeight: 1.5};
        let pos = {lat: mapData.isec_lat, lng: mapData.isec_lng, title: mapData.label};
        iconImg = iconImg.replace(/label/g, pos.title);
        let icon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconImg),
                       scaledSize: new window.google.maps.Size(100, 100),
                       /*anchor: new window.google.maps.Point(0,0)*/
                      };
        return (
          <div>
          <Marker key={"i-marker_" + index} position={pos} title={pos.title.toString()} icon={icon} />
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
