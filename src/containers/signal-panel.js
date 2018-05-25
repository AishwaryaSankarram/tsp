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
    this.state = {
      signals: {},
      activeSignal: {},
      intToSignalMap: {},
      showAllSignals: false,
      isPopoverOpen: false,
      anchorElement: null,
      selIntersection: null,
      laneData: null
    };

    this.renderSignals = this.renderSignals.bind(this);
    this.intersectionToSignalMap = this.intersectionToSignalMap.bind(this);
    this.processSPAT = this.processSPAT.bind(this);
    this.openPopover = this.openPopover.bind(this);
  }

  highlightSignal() {

  }

  componentDidMount() {
    let self = this;
    this.props.onSignalPanelMount(this);
    let webSocket = window.socket
    // webSocket.on('signal', self.renderSignals);
    webSocket.on('spat', self.processSPAT);
    // self.processSPAT({});
  }

  displaySPAT(data){
    // console.info("SPAT Info received in event", "spat", data);
  }

  processSPAT(d){
    // console.info("SPAT Info received in event", "spat", d);
    let self = this;
    let data = JSON.parse(d);
    let content =  " data with intersection ID " +  data.isec_id + " sent by RSU"
    let logInfo = {className: "spat-text", timestamp: data.timestamp, label: "SPAT", content: content };
    this.props.addLogs(logInfo);
    let signals = self.state.signals;
    let activeSignal = data;
    signals[data.isec_id] = data;
    clearInterval(self.intervalTimer);
    for(let sig in signals){
      if(sig !== data.isec_id.toString()){
        signals[sig].color = "";
        signals[sig].timer = "";
      }
    }
    let notification = "Current signal state of intersection " + data.isec_id + " is " + data.color + " and the timer reads " + data.timer + " seconds.";
    this.props.showNotifications(notification);
    self.setState({ signals: signals, activeSignal: data, isPopoverOpen: false, selIntersection: null });
    let currentState = data;
    if (parseInt(currentState.timer, 10) >= 0){
      self.intervalTimer = setInterval(function () {
          currentState.timer = parseInt(currentState.timer, 10) - 1;
          signals[data.isec_id] = currentState;
          if (parseInt(currentState.timer,10) > 0 && parseInt(currentState.timer, 10) < 10)
              currentState.timer = "0" + currentState.timer;
          if(parseInt(currentState.timer,10) > 0){
            self.setState({ activeSignal: activeSignal, signals: signals });
          }else{
            currentState.timer="";
            currentState.color="";
            self.setState({ activeSignal: activeSignal, signals: signals });
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

  getConnectDirs(id) {
    let selectedInt = this.state.intToSignalMap[id];
    let connect_dirs;
    if(selectedInt) {
      let connect_dirs = selectedInt.lane_info.filter((lane) => lane.lane_id === selectedInt.veh_lane_id)[0].connect_dirs;
      return connect_dirs;
    }

    return null;
  }



  render() {
      let signals=<div></div>;
      if(Object.keys(this.state.signals).length == 0) {
        signals = <span title="dummy_signal" className="signal" style={{marginTop: "-66px"}} >
        <Signal key={0} connectDirs={["straight"]} data={this.state.activeSignal} />
            </span>;
      }
      if(Object.keys(this.state.signals).length > 0){
      if(!this.state.showAllSignals || (this.state.showAllSignals && Object.keys(this.state.signals).length === 1)) {
        signals = <span title={this.state.activeSignal.isec_id} className="signal" style={{marginTop: "-66px"}} key={"signal-li_" + 0} >
        <Signal key={0} connect_dirs={this.getConnectDirs(this.state.activeSignal.isec_id)} data={this.state.activeSignal} clicksignal={(event) => this.openPopover(event, this.state.activeSignal.isec_id)}/>
            </span>;
        } else {
          let signalObjects = Object.values(this.state.signals);
          signals = [];
          signalObjects.forEach((signal, index) => {
            signals.push(<span title={signal.isec_id} className="multi-signal" key={"signal-li_" + index} >
            <Signal key={0} connect_dirs={this.getConnectDirs(signal.isec_id)} data={signal}
            clicksignal={(event) => this.openPopover(event, signal.isec_id)}/>
                </span>);
          });
        }
      }

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
                style={{width: this.state.intToSignalMap[this.state.selIntersection].lane_info.length * 60}}
                canAutoPosition={true}
                anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                onRequestClose={this.handlePopoverClose.bind(this)}>
                  {this.state.intToSignalMap[this.state.selIntersection] && <LaneData data={this.state.intToSignalMap[this.state.selIntersection]}/>}
                </Popover> }
              </div>
            </MuiThemeProvider>
        <div className="text-content">{signals}</div>
        </div>

    );

  }
}
