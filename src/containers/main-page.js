import React, {Component} from 'react';
import {MapContainer} from './map';
import {VehicleContainer} from './vehicle';
import {LogsContainer} from './logs';
import { SignalPanel } from './signal-panel';
import openSocket from 'socket.io-client';

window.socket = openSocket("http://192.168.1.3:8808", { transports: ['websocket'] });

export class MainPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			vehicle: 0,
			logs: null
		};
	}

	handleVehicleMount(obj){
		this.setState({vehicle: obj});
	}

	handleLogsMount(obj){
		this.setState({logs: obj});
	}


	render(){
		return (
			<div>
				Main Page
				<div className="top-panel">
					<SignalPanel />
					<VehicleContainer onVehicleMount={this.handleVehicleMount.bind(this)}/>
				</div>
				<div className="bottom-panel">
					<MapContainer vehicle={this.state.vehicle}/>
					<LogsContainer onLogsMount={this.handleLogsMount.bind(this)}/>
				</div>
  			</div>
		);
	}
}
