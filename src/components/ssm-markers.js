import React, {Component} from 'react';
import { Marker } from "react-google-maps";

export class SSMMarkers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ssmInfo: [{ lat: 42.3416928, lng: -83.0790249, deviceType: 0, id: 789 }, { lat: 42.3350748, lng: -83.0494584, deviceType: 1, id: 987 }]
    };

    this.processSSM = this.processSSM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displaySSM = this.displaySSM.bind(this);
  }

  componentDidMount(){
    this.props.onMount(this);
    let webSocket = window.socket;
    // webSocket.on('ssm', this.processSSM);
    webSocket.on('ssm', this.displaySSM);
  }

  componentWillUnmount() {
    this.props.onMount(null);
  }
  
  displaySSM(data) {
    console.info("SSM Info received in event", "ssm", data);
  }

  processSSM(data) {
    console.log("SSm Data arrived----", data, typeof data);
    let currentMarkers = this.state.ssmInfo;
    currentMarkers.push(data);
    this.setState({ssmInfo: currentMarkers});
  }

  handleClick(data){
    console.log("On click SSM------", data);
    this.props.logs.openTabs("ssm", data);
  }

  render() {
    let currentMarkers = this.state.ssmInfo;
    let markers = currentMarkers.map((pos, index) => {
      return (
        <Marker key={index} position={pos} draggable={false} onClick={id => this.handleClick(pos)} />
        );
    });

    return (
      <div>{markers}</div>
    );

  }
}
