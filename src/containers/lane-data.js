import React, {Component} from 'react';
//import {leftArrow} from '../images/left'


export class LaneData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfLanes: 4
    }

    this.laneWidth = 220;

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
        laneElements.push(<g key={"lane_" + i} id={"lane_" + i} transform={"translate(" + (14.000000 + (i*this.laneWidth)) + ", 25.637820)"} fill="#FFFFFF" stroke="#69BCFB" strokeLinecap="round">
            <rect id="l-1" x="0" y="0.36218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="100.86218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="201.36218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="301.36218" width="7" height="51.25"/>
            <g key={"arrow" + i} id="l-s-r" transform="translate(10.000000, 60.000)" fill="#FFFFFF" fill-rule="nonzero" stroke="#FFFFFF" stroke-width="1">
                        <path d="M89.147397,207.238756 L108.539844,207.238756 L108.539852,52.388573 L121.931416,58.248082 C129.979479,61.576897 132.602323,57.5823 127.063981,47.178653 L99.711935,0 L70.478537,50.362491 C66.1559942,58.240019 70.937494,62.64654 78.285636,58.659991 L89.292111,51.954405 L89.292111,142.114848 C80.146218,135.653387 68.531881,129.549639 51.9544111,130.103101 L58.3220761,119.538555 C62.310107,110.367177 55.2243366,108.225705 49.5795228,111.934688 L0,140.667648 L50.9413617,170.045768 C59.994637,174.072922 61.0392047,166.79742 58.4791358,162.210221 L52.388568,150.653312 C76.379528,152.110271 89.224997,170.295966 89.002674,195.516454 L89.147397,207.238756 Z" id="path3828"></path>
                        <path d="M88,207 L109.603194,207 L109.603194,180.881604 C111.259918,169.370116 125.385756,154.669417 135.485016,154.600865 L158.340017,154.600865 L152.548376,168.77981 C150.204347,174.407198 153.023525,180.776996 163.338565,174.947539 L218,143.760348 L162.907398,112.169502 C152.555767,106.157625 149.090942,114.010535 152.974822,119.139776 L160.825526,132.786841 L133.774512,132.814353 C115.868539,132.905131 88.76598,150.283094 88,176.181278 L88,207 Z" id="path3832" stroke-linecap="round"></path>
                </g>
        </g>
      );
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
