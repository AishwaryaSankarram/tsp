import React, {Component} from 'react';
import {MapContainer} from './map';
import {VehicleContainer} from './vehicle';
import {Signal} from '../components/signal'

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
				<VehicleContainer onVehicleMount={this.handleVehicleMount.bind(this)}/>
				<MapContainer vehicle={this.state.vehicle}/>
				<Signal />
  			</div>

		);
	}
}
