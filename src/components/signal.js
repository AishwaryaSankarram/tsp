import React, {Component} from 'react';
import signalSVG from '../images/signalImage';

export class Signal extends Component {

  constructor(props) {
    super(props);

    this.intervalTimer = null;

    this.state = {
      straight: {
        color: "#000000",
        timer: "XX"
      },
      left: {
        color: "#000000",
        timer: "XX"
      },
      right: {
        color: "#000000",
        timer: "XX"
      }
    }
  }

  componentWillReceiveProps(props) {
    console.log("NEW SIGNAL PROPS RECEIVED ", props);
    let self = this;
    if(this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    this.setState ({
      straight: props.data.straight,
      left: props.data.left,
      right: props.data.right
    });

    this.intervalTimer = setInterval(function() {
      let currentState = self.state
      currentState.straight.timer = currentState.straight.timer - 1;
      currentState.left.timer = currentState.left.timer - 1;
      currentState.right.timer = currentState.right.timer - 1;
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
    return <div dangerouslySetInnerHTML={{__html: svg}} />;
   }
}
