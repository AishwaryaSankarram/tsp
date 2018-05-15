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

    this.state = {socketData: {},
                  intToSignalMap: {},
                  showAllSignals: false,
                  isPopoverOpen: false,
                  anchorElement: null
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
  }

  displaySPAT(data){
    console.info("SPAT Info received in event", "spat", data);
  }

  handleChange(event) {
    this.setState({
      showAllSignals: event.target.checked
    });
  }

  openPopover(event) {
    this.setState({
      isPopoverOpen: true,
      anchorElement: event.currentTarget
    });
  }

  handlePopoverClose() {
    this.setState({isPopoverOpen: false});
  }

  componentWillUnmount() {
    this.props.onSignalPanelMount(null);
  }

  intersectionToSignalMap(obj) {
    this.setState({intToSignalMap: obj});
  }

  renderSignals(data) {
    let parsedData = JSON.parse(data);
    let oldSocketData = this.state.socketData;
    oldSocketData[parsedData.id] = parsedData.east;
    this.setState({ socketData: oldSocketData });

  }



  render() {
    let currentSocketValues = Object.values(this.state.socketData);

    let self = this;

    // let signals = currentSocketValues.map((data, index) => {
    //     if(index < 5){
    //       return (
    //         <li title={self.state.intToSignalMap[Object.keys(self.state.socketData)[index]]} className="signal" key={"signal-li_" + index}>
    //           <button><i className="fa fa-plus"></i></button>
    //           <Signal key={index} data={data} />
    //         </li>
    //       );
    //     }
    // });

// This code is added for icon testing
      let signals = <li title={"A"} className="signal" key={"signal-li_" + 0}>
              <button><i className={this.state.isPopoverOpen ? "fa fa-minus" : "fa fa-plus"} onClick={(event) => this.openPopover(event)}></i></button>
      <Signal key={0} />
          </li>;
    return (

        <div className="signal-panel">
          <div className="signal-header">
            <label> Intersection Details </label>
            <Checkbox className="signals-checkbox" checked={this.state.showAllSignals} onChange={(event) => this.handleChange(event)}>
              Show All Signals
            </Checkbox>
          </div>
          <MuiThemeProvider >
             <Popover className="menu_header"
             open={this.state.isPopoverOpen}
             anchorEl={this.state.anchorElement}
             canAutoPosition={true}
             anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
             targetOrigin={{horizontal: 'center', vertical: 'top'}}
             onRequestClose={this.handleRequestClose}>
              <LaneData />
            </Popover>
            </MuiThemeProvider>
        <div className="text-content"><ul key="signal-list">{signals}</ul></div>
        </div>

    );

  }
}
