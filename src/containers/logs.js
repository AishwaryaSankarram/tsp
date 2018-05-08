import React, {Component} from 'react';
import '../css/logs.css';

export class LogsContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			carId: 123,
			latitude: 12345.96, 
			longitude: 987456.389,
			speed: "110" ,
			distance: "30", 
			laneId: "A1"	 
		};
		this.updateData = this.updateData.bind(this);
	}

	componentDidMount() {
        console.log("Log div Did Mount------------");
        this.props.onLogsMount(this);
    }

    componentWillUnmount(){
    	this.props.onLogsMount(null);	
    }

    updateData(obj){
		if(obj.carId){
			this.setState({
	    		carId: obj.carId,
	    		latitude: obj.lat,
	    		longitude: obj.lng,
	    		speed: obj.speed
    		});	
		}                                    
    }

	render(){
		return (
			<div className="log-container">
				<label className="logs-header"> Device Logs </label>
				<hr/>
				ID: {this.state.carId}<br/>
				Latitude: {this.state.latitude} <br/>
				Longitude: {this.state.longitude} <br/>
				Speed: {this.state.speed + ' mph'} <br/>
				Distance from the intersection: {this.state.distance + ' metres'}  <br/>
				Lane ID: {this.state.laneId}
  			</div>
		);
	}
}
