import React, {Component} from 'react';
import {MapComponent} from '../components/map';
import '../css/map.css';
export class MapContainer extends Component{

	render(){
		// console.log("Rendering MapContainer-----", this.props)
		return (
			<div className="map-container">
			<MapComponent loadingElement={<div style={{ height: `100%` }} />}
  			   containerElement={<div style={{ height: `470px`}} />}
  			   mapElement={<div style={{ height: `100%` }} />}
  			   vehicle={this.props.vehicle}
			   signalpanel={this.props.signalpanel}
			   srmsent={this.props.srmsent}
				 updatesrm={this.props.updatesrm}
				 ssmsent={this.props.ssmsent}
			   fetchSSM={this.props.fetchSSM}
			   fetchSRM={this.props.fetchSRM}
			   addLogs={this.props.addLogs}
			   onSrmMount={this.props.onSrmMount}
			   onSsmMount={this.props.onSsmMount}
			   onBusMount={this.props.onBusMount}
			   onInterMarkerMount={this.props.onInterMarkerMount}
			   showNotifications={this.props.showNotifications}
			   focusBus={this.props.focusBus}
  			/>
  			</div>
		);
	}
}
