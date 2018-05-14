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

	clearLogs() {
			this.setState({
					carId: "",
					latitude: "",
					longitude: "",
					speed: "" ,
					distance: "",
					laneId: ""
			})
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
				<div className="logs-header"> <label>Device Logs</label>
					<div className="clear-logs" onClick={this.clearLogs.bind(this)}>Clear logs</div>
				</div>
				<div className="text-content">
					<label>ID:</label> {this.state.carId}<br/>
					<label>Latitude:</label> {this.state.latitude} <br/>
					<label>Longitude:</label> {this.state.longitude} <br/>
					<label>Speed:</label> {this.state.speed + ' mph'} <br/>
					<label>Distance from the intersection: </label> {this.state.distance + ' metres'}  <br/>
					<label>Lane ID:</label> {this.state.laneId}
				</div>
  			</div>
		);
	}
}
