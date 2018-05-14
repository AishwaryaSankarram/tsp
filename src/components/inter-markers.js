import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import InterIcon from '../images/intersection-icon';

window.signalToInt = {};

export class InterMarkers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markerPos: [],
      signalToIntMap: {}
    };

    this.updateIntersections = this.updateIntersections.bind(this);
    this.displayMapData = this.displayMapData.bind(this);
  }

  componentDidMount() {
    let self = this;
    let webSocket = window.socket;
    webSocket.on("mapData", self.displayMapData);
    // webSocket.on("mockMap", self.updateIntersections);

  }

  displayMapData(data){
    console.info("mapData received in event", "mapData", data);
  }

  updateIntersections(data) {
    let oldMarkerPos = this.state.markerPos;
    let oldSignalToIntMap = this.state.signalToIntMap;
    let posObj = {lat: data.pos.x, lng: data.pos.y, signalId: data.signalId, title: String.fromCharCode(oldMarkerPos.length + 65)};
    oldSignalToIntMap[posObj.signalId] = posObj.title;
    oldMarkerPos.push(posObj);
    this.setState({markerPos: oldMarkerPos, signalToIntMap: oldSignalToIntMap});
    this.props.signalpanel.intersectionToSignalMap(oldSignalToIntMap);

  }

  render() {
    let markerPositions = this.state.markerPos;
    let markers = markerPositions.map( (pos, index) => {
        let iconImg = InterIcon;
        iconImg = iconImg.replace(/label/g, pos.title);
        let icon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconImg),
                       scaledSize: new window.google.maps.Size(50, 50)
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
