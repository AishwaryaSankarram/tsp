import React, {Component} from 'react';
import { Signal } from '../components/signal';
import {LaneData} from './lane-data';
import {Checkbox} from "react-bootstrap";
import Popover from "material-ui/Popover";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/signal-panel.css';
import { toast } from 'react-toastify';
import { showAllIntersections } from '../constants.js';


export class SignalPanel extends Component {

  constructor(props) {
    super(props);

    this.intervalTimer = {};
    this.state = {
      signals: {},
      activeSignal: {},
      intToSignalMap: {},
      showAllSignals: showAllIntersections,
      isPopoverOpen: false,
      anchorElement: null,
      selIntersection: null,
      laneData: null
    };

    this.intersectionToSignalMap = this.intersectionToSignalMap.bind(this);
    this.processSPAT = this.processSPAT.bind(this);
    this.openPopover = this.openPopover.bind(this);
    this.displaySPATFlash = this.displaySPATFlash.bind(this);
    this.signalToastID = null;
    this.intIDGroupID = null
  }

  componentDidMount() {
    let self = this;
    this.props.onSignalPanelMount(this);
    let webSocket = window.socket
    // webSocket.on('signal', self.renderSignals);
    webSocket.on('spat', self.processSPAT);
    // self.processSPAT({});
  }

  resetData() {
    Object.values(this.intervalTimer).forEach((timer)=> {
      clearInterval(timer);
    });
    this.intervalTimer = {};
    this.setState({
      signals: {},
      activeSignal: {},
      intToSignalMap: {},
      showAllSignals: showAllIntersections,
      isPopoverOpen: false,
      anchorElement: null,
      selIntersection: null,
      laneData: null
    });
  }

  displaySPATFlash(data) {
    if(!this.intIDGroupID || this.intIDGroupID[0] !== data.isec_id || this.intIDGroupID[1] !== data.signal_group_id) {

      let string = "Signal timer for " + data.color.toUpperCase() + " is set to " + data.timer + " SECONDS."
      if(data.color === "green") {
        this.signalToastID = toast.success(string, {
           position: toast.POSITION.TOP_LEFT,
           autoClose: Math.min((data.timer + 1) * 1000, 15000)
         });

      } else if (data.color === "yellow") {
        this.signalToastID = toast.warn(string, {
           position: toast.POSITION.TOP_LEFT,
           autoClose: Math.min((data.timer + 1) * 1000, 15000)
         });

       } else if (data.color === "red") {
         this.signalToastID = toast.error(string, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: Math.min((data.timer + 1) * 1000, 15000)
          });
       }

       this.intIDGroupID = [data.isec_id, data.signal_group_id];

    } else {
      let string = "Signal timer for " + data.color.toUpperCase() + " is set to " + data.timer + " SECONDS."
      let toastType;
      if (data.color ==="green") {
        toastType = toast.TYPE.SUCCESS;
      } else if (data.color === "yellow") {
        toastType = toast.TYPE.WARNING;
      } else if (data.color === "red") {
        toastType = toast.TYPE.ERROR;
      }
      toast.update(this.signalToastID, {
        render: string,
        type: toastType,
        autoClose: Math.min((data.timer + 1) * 1000, 15000)
      });
    }
  }

  processSPAT(d){
    // console.info("SPAT Info received in event", "spat", d);
    let self = this;
    let data = JSON.parse(d);

    this.displaySPATFlash(data); //Send Flash notification
    this.props.sendToIntMarker(data.color, data.isec_id); //Update the colour of Intersection markers

    //Add Logs
    let content = " data with intersection ID " + data.isec_id + " sent by RSU";
    let logInfo = { className: "spat-text", timestamp: data.timestamp, label: "SPAT", content: content };
    this.props.addLogs(logInfo);

    //Add Notifications
    let notification = "Current signal state of intersection " + data.isec_id + " is " + data.color + " and the timer reads " + data.timer + " seconds.";
    this.props.showNotifications(notification);

    let signals = self.state.signals;

    //Popout the older signal when count > 4
    if(Object.keys(signals).length === 4 && !signals[data.isec_id]) {
      let values = Object.values(signals);
      values.sort((a,b) => {
        let c = a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
        return c;
      });
      let toDelete = values[0].isec_id;
      delete signals[toDelete];
    }
    //Set Basic Signal State with new SPAT
    signals[data.isec_id] = data;
    clearInterval(self.intervalTimer[data.isec_id]); //Reset timer for current SPAT

    let activeSignal = data.active ? data : self.state.activeSignal; //Determine active signal
    // if(!activeSignal.isec_id){
    //     activeSignal = data;
    // }
    if(this.state.intToSignalMap[data.isec_id]) { //Set Label from MAP
      let label= this.state.intToSignalMap[data.isec_id].label;
      signals[data.isec_id].label = label;
      if(activeSignal.isec_id) {
        activeSignal.label = this.state.intToSignalMap[activeSignal.isec_id].label;
      }
    }
    //Prepend zero to single digit timers
    if (parseInt(data.timer, 10) > 0 && parseInt(data.timer, 10) < 10)
      data.timer = "0" + data.timer;

    //Set initial State
    self.setState({ signals: signals, activeSignal: activeSignal, isPopoverOpen: false, selIntersection: null });

    //CountDown timer begins
    let currentState = data;
    if (parseInt(currentState.timer, 10) >= 0){
      self.intervalTimer[data.isec_id] = setInterval(function () {
          currentState.timer = parseInt(currentState.timer, 10) - 1;
          signals[data.isec_id] = currentState;
          if (parseInt(currentState.timer,10) > 0 && parseInt(currentState.timer, 10) < 10)
              currentState.timer = "0" + currentState.timer;
              signals[data.isec_id] = currentState;
          if(parseInt(currentState.timer,10) > 0){
            let toChange = {signals: signals};
            self.setState(toChange);
          }else{
            currentState.timer="";
            currentState.color="";
            self.props.clearAllInterSignals(currentState.isec_id);
            signals[currentState.isec_id] = currentState;
            let toChange = { signals: signals, isPopoverOpen: false };
            self.setState(toChange);
            clearInterval(self.intervalTimer[currentState.isec_id]);
          }
      }, 1000);
    }
    //CountDown timer Ends
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

   //Some MAP data flows in --- Show a disabled signal now in addition if the isec ID is new;
  intersectionToSignalMap(obj, newMap) { //MAP comes bef SPAT
    let signals = this.state.signals;
    let currentSignal = this.state.signals[newMap.isec_id];
    if (currentSignal) {
      if (!currentSignal.label) {
        currentSignal.label = newMap.label;
        currentSignal.veh_lane_id = newMap.veh_lane_id;
        signals[newMap.isec_id] = currentSignal;
        this.setState({ intToSignalMap: obj, signals: signals });
      }
    }else {
      signals[newMap.isec_id] = { "timer": "", "color": "", "isec_lat": newMap.isec_lat, "isec_id": newMap.isec_id, "isec_lng": newMap.isec_lng, veh_lane_id: newMap.veh_lane_id,
                    label: newMap.label}
      this.setState({ intToSignalMap: obj, signals: signals});
    }
  }


  getConnectDirs(id) {
    let selectedInt = this.state.intToSignalMap[id];
    if(selectedInt) {
      let connect_dirs = selectedInt.lane_info.filter((lane) => lane.lane_id === selectedInt.veh_lane_id)[0].connect_dirs;
      return connect_dirs;
    }

    return null;
  }



  render() {
      let signals=<div></div>;
      if(Object.keys(this.state.signals).length === 0) {
        signals = <span className="signal" key={"signal-li_" + 0} >
          <Signal key={0} connectDirs={["straight"]} data={this.state.activeSignal}/>
            </span>;

      } else if(Object.keys(this.state.signals).length === 1 || !this.state.showAllSignals) {
        signals = <span className="signal" key={"signal-li_" + 0} >
          <Signal key={0} connectDirs={this.getConnectDirs(this.state.activeSignal.isec_id)} data={this.state.activeSignal} clicksignal={(event) => this.openPopover(event, this.state.activeSignal.isec_id)}/>
            </span>;
        //show one signal
      } else {
        let signalObjects = Object.values(this.state.signals);
        signals = [];
        signalObjects.forEach((signal, index) => {
          signals.push(<span className="multi-signal" key={"signal-li_" + index} >
          <Signal key={0}
          activeSignal={signal.isec_id === this.state.activeSignal.isec_id }
          connectDirs={this.getConnectDirs(signal.isec_id)} data={signal}
          clicksignal={(event) => this.openPopover(event, signal.isec_id)}/>
              </span>);
        });

      }

    return (

        <div className="signal-panel">
          <div className="signal-header">
            <label> Intersection Details </label>
          <Checkbox className="signals-checkbox" checked={this.state.showAllSignals}
          onChange={(event) => this.handleChange(event)}>
              Show All Intersections
            </Checkbox>
          </div>
          <MuiThemeProvider >
              <div>
              {this.state.isPopoverOpen && <Popover className="menu_header"
                open={this.state.isPopoverOpen}
                anchorEl={this.state.anchorElement}
                style={{width: this.state.intToSignalMap[this.state.selIntersection].lane_info.length * 60, height: 94 + ((this.state.intToSignalMap[this.state.selIntersection].lane_info.length - 1)*9)}}
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
