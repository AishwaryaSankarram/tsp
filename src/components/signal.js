import React, {Component} from 'react';
import {SignalImage} from '../images/signal-image';

export class Signal extends Component {

  constructor(props) {
    super(props);

    this.intervalTimer = null;

    this.state = {
      straight: {
        color: "#FF0000",
        timer: "88"
      },
      left: {
        color: "#00FF00",
        timer: "88"
      },
      right: {
        color: "#FF0000",
        timer: "88"
      }
    }
  }

  componentWillReceiveProps(props) {
    // console.log("NEW SIGNAL PROPS RECEIVED ", props);
    let self = this;
    if(this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    if(props.data){
      this.setState({
        straight: props.data.straight,
        left: props.data.left,
        right: props.data.right
      });
    }

    this.intervalTimer = setInterval(function() {
      let currentState = self.state;
      if(currentState.straight.timer > 0)
        currentState.straight.timer = currentState.straight.timer - 1;
      if(currentState.left.timer > 0)
        currentState.left.timer = currentState.left.timer - 1;
      if(currentState.right.timer > 0)
        currentState.right.timer = currentState.right.timer - 1;
      if(currentState.straight.timer > 0 || currentState.left.timer > 0 || currentState.right.timer > 0)
          self.setState({currentState});
    }, 1000);
  }



  render() {
    let svg = signalSVG;

    svg = svg.replace(/leftTurnSignal/g, this.state.left.color);
    svg = svg.replace(/straightSignal/g, this.state.straight.color);
    svg = svg.replace(/rightTurnSignal/g, this.state.right.color);
    svg = svg.replace(/leftTimer/g, this.state.left.timer);
    svg = svg.replace(/straightTimer/g, this.state.straight.timer);
    return <SignalImage />
   }
}
