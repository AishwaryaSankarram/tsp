import React, { Component } from 'react';
import { Marker, Polygon } from 'react-google-maps';
// import InterIcon from '../images/intersection-icon';
import SignalInterIcon from '../images/signal-intersection-icon'

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
    //webSocket.on("mapData", self.displayMapData);
    // webSocket.on("mockMap", self.updateIntersections);
    webSocket.on('map', self.updateIntersections);

  }

  displayMapData(data){
    //console.info("mapData received in event", "mapData", data);
  }

  updateIntersections(mapData) {
    let data = JSON.parse(mapData);
    console.log("MAP DATA JSON =>", data);
    let oldSignalToIntMap = this.state.signalToIntMap;
    // if (!oldSignalToIntMap[data.isec_id] || oldSignalToIntMap[data.isec_id].veh_lane_id !== data.veh_lane_id) { //Show Notifications only in case of a lane change/ intersection change;
    //   let notification = "Vehicle is at lane " + data.veh_lane_id + " and entered MAP zone for intersection " + data.isec_id + " with approach having " + data.no_of_lanes + " lane(s).";
    //   this.props.showNotifications(notification);
    // }
    oldSignalToIntMap[data.isec_id] = data;
    let content =  "MAP data with intersection ID " +  data.isec_id + " sent by RSU at " + data.isec_lat + ", " + data.isec_lng + " for vehicle ID " + data.vehicle_id;
    let logInfo = {className: "map-text", timestamp: data.timestamp, label: "MAP", content: content };

    this.props.addLogs(logInfo);
    this.setState({signalToIntMap: oldSignalToIntMap});
    this.props.signalpanel.intersectionToSignalMap(this.state.signalToIntMap);

  }

  render() {
    let mapDataValues = Object.values(this.state.signalToIntMap);

    let markers = mapDataValues.map( (mapData, index) => {
        let iconImg = SignalInterIcon;
        let zoneArray = mapData.zone_array;
        let laneArray = mapData.lane_array;
        console.log("ZONE_ARRAY =>", zoneArray);
        console.log("LANE_ARRAY =>", laneArray);
        let mapZoneOptions = {fillColor: "#0000FF", fillOpacity: 0.2, strokeWeight: 0.5};
        let laneZoneOptions = {fillColor:"#FAFAD2", fillOpacity: 0.5, strokeWeight: 1};
        let pos = {lat: mapData.isec_lat, lng: mapData.isec_lng, title: mapData.isec_id};
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
