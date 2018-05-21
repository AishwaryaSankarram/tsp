import React, {Component} from 'react';
import { Signal } from '../components/signal';
import {LaneData} from './lane-data';
import {Checkbox} from "react-bootstrap";
import Popover from "material-ui/Popover";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/signal-panel.css';


export class SignalPanel extends Component {

  constructor(props) {
    super(props);

    this.intervalTimer = null;
    this.state = { signals: {565: {
      "intersection_id": 565,
        "vehicle_id": 2222,
          "intersection_lat": 42.334088,
            "intersection_lng": -83.034682,
              "timestamp": 1342939205123,
                "connecting_dirs": ["left", "straight"],
                  "color": "yellow",
                    "timer": 43
                  }},
                  activeSignal: {
                    "intersection_id": 565,
                    "vehicle_id": 2222,
                    "intersection_lat": 42.334088,
                    "intersection_lng": -83.034682,
                    "timestamp": 1342939205123,
                    "connecting_dirs": ["left", "straight"],
                    "color": "yellow",
                    "timer": 43
                  },
                  intToSignalMap: {},
                  showAllSignals: false,
                  isPopoverOpen: false,
                  anchorElement: null,
                  selIntersection: null,
                  laneData: null
                };

    this.renderSignals = this.renderSignals.bind(this);
    this.intersectionToSignalMap = this.intersectionToSignalMap.bind(this);
    this.displaySPAT = this.displaySPAT.bind(this);
    this.openPopover = this.openPopover.bind(this);
  }

  componentDidMount() {
    let self = this;
    this.props.onSignalPanelMount(this);
    let webSocket = window.socket
    // webSocket.on('signal', self.renderSignals);
    webSocket.on('spat', self.displaySPAT);
    self.processSPAT({});
  }

  displaySPAT(data){
    //console.info("SPAT Info received in event", "spat", data);
  }

  processSPAT(data){
    // let data = JSON.parse(data);
    data = {
      "intersection_id": 575,
      "vehicle_id": 2222,
      "intersection_lat": 42.334088,
      "intersection_lng": -83.034682,
      "timestamp": 1342939205123,
      "connecting_dirs": ["right", "straight"],
      "color": "green",
      "timer": 13
    }
    //console.info("SPAT Info received in event", "spat", data);
    let self = this;
    let signals = this.state.signals;
    let activeSignal = data;
    signals[data.intersection_id] = data;
    clearInterval(self.intervalTimer);
    self.setState({ signals: signals, activeSignal: data });
    let currentState = data;
    if (parseInt(currentState.timer, 10) > 0){
      self.intervalTimer = setInterval(function () {
          currentState.timer = parseInt(currentState.timer, 10) - 1;
          signals[data.intersection_id] = currentState;
          if (parseInt(currentState.timer,10) > 0 && parseInt(currentState.timer, 10) < 10)
              currentState.timer = "0" + currentState.timer;
          if(parseInt(currentState.timer,10) > 0){
            self.setState({ activeSignal: activeSignal, signals: signals });
          }else{
            clearInterval(self.intervalTimer);
          }
              
      }, 1000);
    }
  }

  handleChange(event) {
    this.setState({
      showAllSignals: event.target.checked
    });
  }

  openPopover(event, id) {
    if(this.state.isPopoverOpen){
      this.setState({ isPopoverOpen: false, selIntersection: null });
    } else {
      this.setState({
        isPopoverOpen: true,
        anchorElement: event.currentTarget,
        selIntersection: id
      });
    }

  }

  handlePopoverClose() {
    this.setState({ isPopoverOpen: false, selIntersection: null});
  }

  componentWillUnmount() {
    this.props.onSignalPanelMount(null);
  }

  intersectionToSignalMap(obj) {
    this.setState({intToSignalMap: obj});
  }

  renderSignals(data) {
    let parsedData = JSON.parse(data);
    let oldsignals = this.state.signals;
    oldsignals[parsedData.id] = parsedData.east;
    this.setState({ signals: oldsignals });

  }



  render() {
    console.log("INT_TO_SIGNAL_MAP", this.state.intToSignalMap);
    // let currentSocketValues = Object.values(this.state.signals);

    // let self = this;

    // let signals = currentSocketValues.map((data, index) => {
    //     if(index < 5){
    //       return (
    //         <li title={self.state.intToSignalMap[Object.keys(self.state.signals)[index]]} className="signal" key={"signal-li_" + index}>
    //           <button><i className="fa fa-plus"></i></button>
    //           <Signal key={index} data={data} />
    //         </li>
    //       );
    //     }
    // });

// This code is added for icon testing
      let signals;
      if(!this.state.showAllSignals || (this.state.showAllSignals && Object.values(this.state.signals).length == 1)) {
        signals = <span title={this.state.activeSignal.intersection_id} className="signal" key={"signal-li_" + 0} onClick={(event) => this.openPopover(event, this.state.activeSignal.intersection_id)}>
        <Signal key={0} data={this.state.activeSignal} />
            </span>;
        } else {
          console.log("INSIDE ELSE LOOP");
          console.log("SIGNAL STATE =>", this.state.signals);
          let signalObjects = Object.values(this.state.signals);
          signals = [];
          signalObjects.forEach((signal, index) => {
            signals.push(<span title={signal.intersection_id} className="multi-signal" key={"signal-li_" + index} onClick={(event) => this.openPopover(event, signal.intersection_id)}>
            <Signal key={0} data={signal} />
                </span>);
          });
        }

        console.log("SIGNALS ->", signals);
    return (

        <div className="signal-panel">
          <div className="signal-header">
            <label> Intersection Details </label>
            <Checkbox className="signals-checkbox" checked={this.state.showAllSignals} onChange={(event) => this.handleChange(event)}>
              Show All Signals
            </Checkbox>
          </div>
          <MuiThemeProvider >
              <div>
              {this.state.isPopoverOpen && <Popover className="menu_header"
                open={this.state.isPopoverOpen}
                anchorEl={this.state.anchorElement}
                canAutoPosition={true}
                anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                onRequestClose={this.handlePopoverClose.bind(this)}>
                  <LaneData data={this.state.intToSignalMap[this.state.selIntersection]}/>
                </Popover> }
              </div>
            </MuiThemeProvider>
        <div className="text-content">{signals}</div>
        </div>

    );

  }
}
