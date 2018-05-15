import React, {Component} from 'react';
import {MapContainer} from './map';
import {VehicleContainer} from './vehicle';
import {LogContainer} from './log';
import { SignalPanel } from './signal-panel';
// import {MessageContainer} from './message'


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
				<div className="left-panel">
					<div className="top-panel">
						<SignalPanel onSignalPanelMount={this.handleSignalPanelMount.bind(this)} />
						<VehicleContainer onVehicleMount={this.handleVehicleMount.bind(this)} />
						{/* <MessageContainer onMessageMount={this.handleMessageMount.bind(this)} /> */}
						
					</div>
					<div className="bottom-panel">
						<MapContainer signalpanel={this.state.signalPanel} logs={this.state.logs} vehicle={this.state.vehicle} message={this.state.message} />
					</div>
				</div>
				<div className="right-panel">
					<div className="side-panel">
						<LogContainer onLogsMount={this.handleLogsMount.bind(this)} />
					</div>
				</div>
  			</div>
		);
	}
}
