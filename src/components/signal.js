import React, {Component} from 'react';
import signalSVG from '../images/signalImage';

export class Signal extends Component {

  constructor(props) {
    super(props);

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
    // console.log("NEW SIGNAL PROPS RECEIVED ", props);
    this.setState ({
      straight: props.data.straight,
      left: props.data.left,
      right: props.data.right
    })
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
