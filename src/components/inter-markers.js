import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import InterIcon from '../images/intersection-icon';

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
        let iconImg = InterIcon;
        let title =  String.fromCharCode(index + 65);
        iconImg = iconImg.replace(/label/g, title);
        let icon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconImg),
                       scaledSize: new window.google.maps.Size(50, 50)
                      };
        return (
          <Marker key={"i-marker_" + index} position={pos} title={title} icon={icon} />
        );
    });

    return (
      <div>
        {markers}
      </div>
    );

  }




}
