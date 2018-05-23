import React, {Component} from 'react';
import {LeftStraightRightArrow} from '../images/left-straight-right-arrow';
import {LeftStraightArrow} from '../images/left-straight-arrow';
import {LeftArrow} from '../images/left-arrow';
import {StraightRightArrow} from '../images/straight-right-arrow';
import {LeftRightArrow} from '../images/left-right-arrow';
import {RightArrow} from '../images/right-arrow';
import {StraightArrow} from '../images/straight-arrow'

export const arrowMap = {

  "left": LeftArrow,
  "straight": StraightArrow,
  "right": RightArrow,
  "leftstraight": LeftStraightArrow,
  "straightright": StraightRightArrow,
  "leftright": LeftRightArrow,
  "leftstraightright": LeftStraightRightArrow
}


export class LaneData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }

    this.laneWidth = 220;

    this.buildLanes = this.buildLanes.bind(this);
    this.getBlueBoxWidth = this.getBlueBoxWidth.bind(this);
    this.getBorderBoxWidth = this.getBorderBoxWidth.bind(this);
    this.getViewBox = this.getViewBox.bind(this);
    this.getWidth = this.getWidth.bind(this);
  }



  buildLanes() {
    let numberOfLanes = this.state.data.lane_info.length;
    let laneInfo = this.state.data.lane_info;
    let vehicleLaneId = this.state.data.veh_lane_id;
    let laneElements = []
    for(var i=0; i<numberOfLanes+1; i++) {
      let arrowString = "";
      let color;
      let ArrowElement;
        if(i<numberOfLanes) {
          // console.log(laneInfo[i]);
          let connect_dirs = laneInfo[i].connect_dirs;

          if(connect_dirs.includes("left")){
            arrowString += "left"
          }
          if(connect_dirs.includes("straight")){
            arrowString += "straight"
          }
          if(connect_dirs.includes("right")){
            arrowString += "right"
          }
          ArrowElement = arrowMap[arrowString];
          laneInfo[i].lane_id === vehicleLaneId ? color = "#FFFF00" : color = "#FFFFFF"
        }
        laneElements.push(<g key={"lane_" + i} id={"lane_" + i} transform={"translate(" + (14.000000 + (i*this.laneWidth)) + ", 25.637820)"} fill="#FFFFFF" stroke="#69BCFB" strokeLinecap="round">
            <rect id="l-1" x="0" y="0.36218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="100.86218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="201.36218" width="7" height="51.25"/>
            <rect id="l-1" x="0" y="301.36218" width="7" height="51.25"/>
            {ArrowElement && <ArrowElement color={color} />}
        </g>
      );
      }

    return laneElements;
  }

  getBlueBoxWidth() {
    let numberOfLanes = this.state.data.lane_info.length;
    let blueBoxWidth = (numberOfLanes * this.laneWidth) + 28;
    return blueBoxWidth.toString();
  }

  getBorderBoxWidth() {
    let numberOfLanes = this.state.data.lane_info.length;
    let borderBoxWidth = (numberOfLanes * this.laneWidth) + 36;
    return borderBoxWidth.toString();
  }

  getViewBox() {
    let numberOfLanes = this.state.data.lane_info.length;
    let svgWidth = (numberOfLanes * this.laneWidth) + 66;
    return "0 0 " + svgWidth.toString() + " 450";
  }

  getWidth() {
    let numberOfLanes = this.state.data.lane_info.length;
    let svgWidth = (numberOfLanes * this.laneWidth) + 66;
    return svgWidth.toString() + "px";
  }


  render() {

    return (
      <svg width="100%" height="100%" viewBox={this.getViewBox()} version="1.1" style={{zoom: 0.25}}>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinejoin="round">
          <g id="road-lane-icon" transform="translate(16.000000, 16.000000)" fillRule="nonzero">
              <rect id="bg-2" stroke="#0066B3" strokeWidth="32" fill="#0066B3" strokeLinecap="round" x="0.607143" y="0.53571" width={this.getBlueBoxWidth()} height="403.03571"/>
              <g id="bg-1" strokeLinecap="round">
                  <use fill="#0066B3" fillRule="evenodd"/>
                  <rect stroke="#FFFFFF" strokeWidth="12" x="-2" y="-2.07141" width={this.getBorderBoxWidth()} height="408.60715"/>
              </g>
              {this.buildLanes()}
           </g>
        </g>
  </svg>
);
  }

}
