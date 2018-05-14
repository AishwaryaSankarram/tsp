import React, {Component} from 'react';
import {MapContainer} from './map';
import {VehicleContainer} from './vehicle';
import {LogsContainer} from './logs';
import { SignalPanel } from './signal-panel';
import {MessageContainer} from './message'
import openSocket from 'socket.io-client';

window.socket = openSocket("http://192.168.1.3:8808", { transports: ['websocket'] });

export class MainPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			vehicle: 0,
			logs: null,
			message: null,
			signalPanel: null
		};
	}

	handleSignalPanelMount(obj) {
		this.setState({signalPanel: obj})
	}

	handleVehicleMount(obj){
		this.setState({vehicle: obj});
	}

	handleMessageMount(obj) {
		this.setState({message: obj});
	}

	handleLogsMount(obj){
		this.setState({logs: obj});
	}


	render(){
		return (
			<div className="main-page">
				<div className="top-panel">
					<VehicleContainer onVehicleMount={this.handleVehicleMount.bind(this)} />
					<MessageContainer onMessageMount={this.handleMessageMount.bind(this)}/>
					<SignalPanel onSignalPanelMount={this.handleSignalPanelMount.bind(this)} />
				</div>
				<div className="bottom-panel">
					<MapContainer signalpanel={this.state.signalPanel} vehicle={this.state.vehicle} message={this.state.message}/>
					<LogsContainer onLogsMount={this.handleLogsMount.bind(this)}/>
				</div>
  			</div>
		);
	}
}
