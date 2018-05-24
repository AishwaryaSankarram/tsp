import React, {Component} from 'react';

import {lt, st, rt, lt_st, st_rt, lt_st_rt, lt_rt} from '../constants.js';

const directionToArrowMap = {
  "left": lt,
  "straight": st,
  "right": rt,
  "leftstraight": lt_st,
  "straightright": st_rt,
  "leftright": lt_rt,
  "leftstraightright": lt_st_rt
}

export class SignalImage extends Component {

    getDirection() {
      let connecting_dirs = this.props.connectDirs;
      let arrowString = "";
      if (connecting_dirs.includes("left")) {
        arrowString += "left"
      }
      if (connecting_dirs.includes("straight")) {
        arrowString += "straight"
      }
      if (connecting_dirs.includes("right")) {
        arrowString += "right"
      }
      return directionToArrowMap[arrowString];
    }

    render(){
    return (
     <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="236px" viewBox="0 0 480 700" version="1.1" >
     <title>{this.props.label}</title>
     <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" onClick={this.props.clicksignal}>
        <g id="signal-details-(1)" transform="translate(0,125)">
           <g id="signal-label" transform="translate(205, -151)">
              <g id="A" transform="translate(3.00, -35)" fill="#3B3B3B" fontFamily="Arial" fontSize="35">
                 <text>
                    <tspan x="0" y="136">{this.props.label}</tspan>
                 </text>
              </g>
           </g>
           <g fillRule="nonzero" transform="translate(239.702420, 80.860168) rotate(90.000000) translate(-239.702420, -115.860168) translate(124.702420, -123.639832)" id="Group">
              <path d="M115,0 C51.4917183,0 1.42108547e-14,32.7239344 1.42108547e-14,73.0911475 L1.42108547e-14,405.593443 C1.42108547e-14,445.960656 51.4917183,478.68459 115,478.68459 C178.508282,478.68459 230,445.960656 230,405.593443 L230,73.0911475 C230,32.7239344 178.508282,0 115,0 Z" id="Shape" fill="#E5E5E5"/>
              <path d="M115,13 C59.7747472,13 15,43.9311475 15,82.0872131 L15,396.36918 C15,434.525246 59.7747472,465.456393 115,465.456393 C170.225253,465.456393 215,434.525246 215,396.36918 L215,82.0872131 C215,43.9311475 170.225253,13 115,13 Z" id="Shape" fill="#3B3B3B"/>
              <circle id="red-s" fill={this.props.colors[0]} cx="117.393443" cy="373.393443" r="56.3934426"/>
              <circle id="yellow-s" fill={this.props.colors[1]} cx="117.393443" cy="242.393443" r="56.3934426"/>
              <circle id="green-s" fill={this.props.colors[2]} cx="118.393443" cy="111.606557" r="56.3934426"/>
           </g>
           <g id="signal-timer" transform="translate(24.000000, 200.000000)">
              <rect id="Rectangle" fill="#E5E5E5" fillRule="nonzero" x="294" y="1" width="135" height="125"/>
              <g id="28" transform="translate(296.000000, 0.000000)" fill="#3B3B3B" fontFamily="Arial" fontSize="120" fontWeight="">
                 <text id="greenSignalTimer">
                    <tspan x="0" y="109">{this.props.timers[2]}</tspan>
                 </text>
              </g>
              <rect id="Rectangle" fill="#E5E5E5" fillRule="nonzero" x="147" y="1" width="135" height="125"/>
              <g id="28" transform="translate(149.000000, 0.000000)" fill="#3B3B3B" fontFamily="Arial" fontSize="120" fontWeight="">
                 <text id="yellowSignalTimer">
                  <tspan x="0" y="109">{this.props.timers[1]}</tspan>
                 </text>
              </g>
              <rect id="Rectangle" fill="#E5E5E5" fillRule="nonzero" x="0" y="1" width="135" height="125"/>
              <g id="28" transform="translate(3.000000, 0.000000)" fill="#3B3B3B" fontFamily="Arial" fontSize="120" fontWeight="">
                 <text id="redSignalTimer">
                  <tspan x="0" y="109">{this.props.timers[0]}</tspan>
                 </text>
              </g>
           </g>
             {this.getDirection() && <g id="signal-direction" transform="translate(25.000000, 325)" fillRule="nonzero">
              <circle id="center-d" fill="#E5E5E5" cx="215.5" cy="71.5" r="71.5"/>
                this.getDirection()</g>}
        </g>
     </g>
  </svg>
  );
}
}
