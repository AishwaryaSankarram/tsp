import React, {Component} from 'react';
import {MapComponent} from '../components/map';

export class MapContainer extends Component{

	render(){
		return (
			<div className="map-container">
			<MapComponent loadingElement={<div style={{ height: `100%` }} />}
  			   containerElement={<div style={{ height: `400px` }} />}
  			   mapElement={<div style={{ height: `100%` }}   />}
  			/>
  			</div>
		);
	}
}
