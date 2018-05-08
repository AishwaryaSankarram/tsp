import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

export class InterMarkers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markerPos: []
    };

    this.updateIntersections = this.updateIntersections.bind(this);
  }

  componentDidMount() {
    console.log("Intersection Markers did mount.");
    let self = this;
    let webSocket = window.socket;
    console.log(webSocket);
    webSocket.on("mockMap", self.updateIntersections);

  }

  updateIntersections(data) {

    let posObj = {lat: data.pos.x, lng: data.pos.y};
    let oldMarkerPos = this.state.markerPos;
    oldMarkerPos.push(posObj);
    this.setState({markerPos: oldMarkerPos});

  }

  render() {
    let markerPositions = this.state.markerPos;
    let markers = markerPositions.map( (pos, index) => {
        return (
          <Marker key={index} position={pos} />
        );
    });

    return (
      <div>
        {markers}
      </div>
    );

  }




}
