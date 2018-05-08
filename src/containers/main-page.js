import React, {Component} from 'react';
import {MapContainer} from './map';
import {VehicleContainer} from './vehicle';
import {Signal} from '../components/signal'
import { SignalPanel } from './signal-panel';
import openSocket from 'socket.io-client';

window.socket = openSocket("http://192.168.1.3:8808", { transports: ['websocket'] });

export class MainPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			vehicle: 0
		};
	}

	handleVehicleMount(obj){
		this.setState({vehicle: obj});
	}

	render(){
		return (
			<div>
				Main Page
				<SignalPanel />
				<VehicleContainer onVehicleMount={this.handleVehicleMount.bind(this)}/>
				<MapContainer vehicle={this.state.vehicle}/>

  			</div>

		);
	}
}
