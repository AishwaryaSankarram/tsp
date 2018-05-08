import React, {Component} from 'react';
import {MapComponent} from '../components/map';
import '../css/map.css';
export class MapContainer extends Component{

	render(){
		console.log("Rendering MapContainer-----", this.props)
		return (
			<div className="map-container">
			<MapComponent loadingElement={<div style={{ height: `100%` }} />}
  			   containerElement={<div style={{ height: `700px`}} />}
  			   mapElement={<div style={{ height: `100%` }} />}
  			   vehicle={this.props.vehicle}
  			/>
  			</div>
		);
	}
}
