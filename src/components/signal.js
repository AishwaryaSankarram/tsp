import React, {Component} from 'react';
import {SignalImage} from '../images/signal-image';

let colors = { red: "#EA4949", yellow: "#EAB42D", green: "#2BBF60" };

export class Signal extends Component {
  render() {
    let data = this.props.data;
    let colorProps = [], timerProps=[];
    if(data.color === "red"){
      colorProps = [colors.red, "#DCDCDC", "#DCDCDC" ];
      timerProps = [data.timer, "", ""];
    }else if(data.color === "yellow"){
      colorProps = ["#DCDCDC", colors.yellow, "#DCDCDC"];
      timerProps = ["", data.timer, ""];
    }else if (data.color === "green"){
      colorProps = ["#DCDCDC", "#DCDCDC", colors.green];
      timerProps = ["", "", data.timer];
    }else{
      colorProps = ["#DCDCDC", "#DCDCDC", "#DCDCDC"];
      timerProps = ["", "", ""];
    }

    return <SignalImage colors={colorProps} timers={timerProps} label={data.label} clicksignal={this.props.clicksignal}
      connectDirs={(data.color && ["red", "yellow", "green"].includes(data.color)) ? this.props.connectDirs : null}/>
   }
}
