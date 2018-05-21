import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
// import InterIcon from '../images/intersection-icon';
import SignalInterIcon from '../images/signal-intersection-icon'

window.signalToInt = {};

export class InterMarkers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signalToIntMap: {"565": {
        isec_id: 565,
        isec_lat: 42.334088,
        isec_lng: -83.034682,
        veh_lane_id: 1,
        lane_info: [
          {
            lane_id: 1,
            connect_dirs: ["left", "straight"]
          },
          {
            lane_id: 2,
            connect_dirs: ["right", "straight"]
          },
          {
            lane_id: 3,
            connect_dirs: ["left", "right"]
          }
        ]
      },

      "575": {
        isec_id: 575,
        isec_lat: 42.334188,
        intersection_lng: -83.034692,
        no_of_lanes: 3,
        veh_lane_id: 2,
        lane_info: [
          {
            lane_id: 1,
            connect_dirs: ["left", "straight"]
          },
          {
            lane_id: 2,
            connect_dirs: ["right", "straight", "left"]
          },
          {
            lane_id: 3,
            connect_dirs: ["left", "straight", "right"]
          }
        ]
      }
     }
    };

    this.updateIntersections = this.updateIntersections.bind(this);
    this.displayMapData = this.displayMapData.bind(this);
  }

  componentDidMount() {
    let self = this;
    let webSocket = window.socket;
    //webSocket.on("mapData", self.displayMapData);
    // webSocket.on("mockMap", self.updateIntersections);
    webSocket.on('map', self.updateIntersections)
    //TO DO: Remove once proper MAP data is produced.
    this.props.signalpanel.intersectionToSignalMap(this.state.signalToIntMap);

  }

  displayMapData(data){
    //console.info("mapData received in event", "mapData", data);
  }

  updateIntersections(mapData) {
    let data = JSON.parse(mapData);
    console.log("MAP DATA JSON =>", data);
    let oldSignalToIntMap = this.state.signalToIntMap;
    oldSignalToIntMap[data.id] = data;
    this.setState({signalToIntMap: oldSignalToIntMap});
    this.props.signalpanel.intersectionToSignalMap(this.state.signalToIntMap);

  }

  render() {
    let mapDataValues = Object.values(this.state.signalToIntMap);

    let markers = mapDataValues.map( (mapData, index) => {
        let iconImg = SignalInterIcon;
        let pos = {lat: mapData.isec_lat, lng: mapData.intersection_lng, title: mapData.isec_id.toString()};
        iconImg = iconImg.replace(/label/g, pos.title);
        let icon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconImg),
                       scaledSize: new window.google.maps.Size(100, 100),
                       /*anchor: new window.google.maps.Point(0,0)*/
                      };
        return (
          <Marker key={"i-marker_" + index} position={pos} title={pos.title} icon={icon} />
        );
    });

    return (
      <div>
        {markers}
      </div>
    );

  }




}
