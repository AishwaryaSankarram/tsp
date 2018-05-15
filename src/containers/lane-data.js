import React, {Component} from 'react';


export class LaneData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfLanes: 4
    }

    this.laneWidth = 200;

    this.buildLanes = this.buildLanes.bind(this);
    this.getBlueBox = this.getBlueBox.bind(this);
    this.getBorderBox = this.getBorderBox.bind(this);
    this.getViewBox = this.getViewBox.bind(this);
    this.getWidthString = this.getWidthString.bind(this);
  }

  buildLanes() {
     console.log("Building the lanes");
    let numberOfLanes = this.state.numberOfLanes;
    let laneElements = []
    for(var i=0; i<numberOfLanes+1; i++) {
        laneElements.push(<g key={"lane_" + i} id={"lane_" + i} transform={"translate(" + (14.000000 + (i*200)) + ", 25.637820)"} fill="#FFFFFF" stroke="#69BCFB" strokeLinecap="round">
            <rect id="l-1" x="0" y="0.36218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="100.86218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="201.36218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="301.36218" width="7" height="51.25"/>
        </g>);
      }

    return laneElements;
  }

  getBlueBox() {
    let numberOfLanes = this.state.numberOfLanes;
    let blueBoxWidth = (numberOfLanes * this.laneWidth) + 28;
    return blueBoxWidth.toString();
  }

  getBorderBox() {
    let numberOfLanes = this.state.numberOfLanes;
    let borderBoxWidth = (numberOfLanes * this.laneWidth) + 36;
    return borderBoxWidth.toString();
  }

  getViewBox() {
    let numberOfLanes = this.state.numberOfLanes;
    let svgWidth = (numberOfLanes * this.laneWidth) + 66;
    return "0 0 " + svgWidth.toString() + " 450";
  }

  getWidthString() {
    let numberOfLanes = this.state.numberOfLanes;
    let svgWidth = (numberOfLanes * this.laneWidth) + 66;
    return svgWidth.toString() + "px";
  }


  render() {

    return (
      <svg width={this.getWidthString()} height="450px" viewBox={this.getViewBox()} version="1.1" style={{zoom: 0.25}}>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinejoin="round">
          <g id="road-lane-icon" transform="translate(16.000000, 16.000000)" fillRule="nonzero">
              <rect id="bg-2" stroke="#0066B3" strokeWidth="32" fill="#0066B3" strokeLinecap="round" x="0.607143" y="0.53571" width={this.getBlueBox()} height="403.03571"/>
              <g id="bg-1" strokeLinecap="round">
                  <use fill="#0066B3" fillRule="evenodd"/>
                  <rect stroke="#FFFFFF" strokeWidth="12" x="-2" y="-2.07141" width={this.getBorderBox()} height="408.60715"/>
              </g>
              {this.buildLanes()}
           </g>
        </g>
  </svg>
);
  }

}
