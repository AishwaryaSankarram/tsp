import React, {Component} from 'react';
import {MapComponent} from '../components/map';
import '../css/map.css';
export class MapContainer extends Component{

	render(){
		console.log("Rendering MapContainer-----", this.props)
		return (
			<div className="map-container">
			<MapComponent loadingElement={<div style={{ height: `100%` }} />}
  			   containerElement={<div style={{ height: `450px`}} />}
  			   mapElement={<div style={{ height: `100%` }} />}
  			   vehicle={this.props.vehicle}
			   signalpanel={this.props.signalpanel}
			   fetchSSM={this.props.fetchSSM}
			   fetchSRM={this.props.fetchSRM}
			   addLogs={this.props.addLogs}
			   onSrmMount={this.props.onSrmMount}
			   onSsmMount={this.props.onSsmMount}
  			/>
  			</div>
		);
	}
}
