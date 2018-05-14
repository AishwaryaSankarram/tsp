import React, {Component} from 'react';
import '../css/logs.css';

export class LogsContainer extends Component{
	constructor(props){
		super(props);
		this.state ={
		logs: [{
			carId: 123,
			latitude: 12345.96,
			longitude: 987456.389,
			speed: "110" ,
			distance: "30",
			laneId: "A1"
		}]
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
				logs: []
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

		let currentLogs = this.state.logs;
		let logsElement;
		if (currentLogs.length !== 0) {
			logsElement = currentLogs.map((log, index) => {
				return(
					<div className="text-content" key={"log_" + index}>
						<label>ID:</label> {log.carId}<br/>
						<label>Latitude:</label> {log.latitude} <br/>
						<label>Longitude:</label> {log.longitude} <br/>
						<label>Speed:</label> {log.speed + ' mph'} <br/>
						<label>Distance from the intersection: </label> {log.distance + ' metres'}  <br/>
						<label>Lane ID:</label> {log.laneId}
					</div>
				);
			});
		} else {
			logsElement = (
				<div className="text-content" key={"log_none"}>
					<br/>
					<strong>No Logs To Display</strong>
				</div>

			);
		}

		return (
			<div className="log-container">
				<div className="logs-header"> <label>Device Logs</label>
					<div className="clear-logs" onClick={this.clearLogs.bind(this)}>Clear logs</div>
				</div>
				{logsElement}
  			</div>
		);
	}
}
