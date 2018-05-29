import React, {Component} from 'react';
import { Signal } from '../components/signal';
import {LaneData} from './lane-data';
import {Checkbox} from "react-bootstrap";
import Popover from "material-ui/Popover";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/signal-panel.css';
import { toast } from 'react-toastify';



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

  displaySPAT(data){
    // console.info("SPAT Info received in event", "spat", data);
  }

  processSPAT(d){
    // console.info("SPAT Info received in event", "spat", d);
    let self = this;
    let data = JSON.parse(d);
    let content =  " data with intersection ID " +  data.isec_id + " sent by RSU"
    let logInfo = {className: "spat-text", timestamp: data.timestamp, label: "SPAT", content: content };

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

    this.props.sendToIntMarker(data.color, data.isec_id);

    this.props.addLogs(logInfo);
    let signals = self.state.signals;
    let activeSignal = data;
    if(Object.keys(signals).length === 4 && !signals[data.isec_id]) {
      let values = Object.values(signals);
      values.sort((a,b) => {
        let c = a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
        return c;
      });
      let toDelete = values[0].isec_id
      delete signals[toDelete];
    }
    signals[data.isec_id] = data;
    if(this.state.intToSignalMap[data.isec_id]) {
      activeSignal.label = this.state.intToSignalMap[data.isec_id].label;
      signals[data.isec_id].label = this.state.intToSignalMap[data.isec_id].label;
    }
    if (parseInt(data.timer, 10) > 0 && parseInt(data.timer, 10) < 10)
      data.timer = "0" + data.timer;
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
              signals[data.isec_id] = currentState;
          if(parseInt(currentState.timer,10) > 0){
            self.setState({ activeSignal: activeSignal, signals: signals });
          }else{
            currentState.timer="";
            currentState.color="";
            self.props.clearAllInterSignals(data.isec_id);
            self.setState({ activeSignal: activeSignal, signals: signals, isPopoverOpen: false });
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

  intersectionToSignalMap(obj, newMap) {
    if(this.state.signals[newMap.isec_id]) {
      clearInterval(this.intervalTimer);
      for(let sig in this.state.signals) {
        if(sig !== newMap.isec_id.toString()){
          this.state.signals[sig].color = "";
          this.state.signals[sig].timer = "";
        }
      }
      this.setState({intToSignalMap: obj, activeSignal: this.state.signals[newMap.isec_id]});

    } else if(newMap.isec_id !== this.state.activeSignal.isec_id) {
      // console.log("MAKING NEW ISEC ID");
      let newActiveSignal = {
        isec_id: newMap.isec_id,
        color: "",
        timer: "",
        label: newMap.label
      }
      clearInterval(this.intervalTimer);
      for(let sig in this.state.signals) {
        if(sig !== newMap.isec_id.toString()){
          this.state.signals[sig].color = "";
          this.state.signals[sig].timer = "";
        }
      }
      let oldSignals = this.state.signals;
      oldSignals[newMap.isec_id] = newActiveSignal;
      this.setState({intToSignalMap: obj, signals: oldSignals, activeSignal: newActiveSignal});

    } else {
      this.setState({intToSignalMap: obj});
    }
  }



  renderSignals(data) {
    let parsedData = JSON.parse(data);
    let oldsignals = this.state.signals;
    oldsignals[parsedData.id] = parsedData.east;
    this.setState({ signals: oldsignals });
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
        signals = <span className="signal" style={{marginTop: "-66px"}} key={"signal-li_" + 0} >
          <Signal key={0} connectDirs={["straight"]} data={this.state.activeSignal}/>
            </span>;

      } else if(Object.keys(this.state.signals).length === 1 || !this.state.showAllSignals) {
        signals = <span className="signal" style={{marginTop: "-66px"}} key={"signal-li_" + 0} >
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
          <Checkbox style={{zIndex: 100}} className="signals-checkbox" checked={this.state.showAllSignals}
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
