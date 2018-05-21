import React, {Component} from 'react';
import '../css/vehicle.css';
// import busIcon from '../images/bus-icon';

export class VehicleContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			carId: "",
			latitude: "",
			longitude: "",
			speed: "" ,
			heading: "",
			distance: "",
			laneId: null
		};
		this.updateData = this.updateData.bind(this);
	}

	componentDidMount() {
        console.log("Vehicle Card Did Mount------------");
        this.props.onVehicleMount(this);
    }

    componentWillUnmount(){
    	this.props.onVehicleMount(null);
    }

    updateData(obj){
    	if(obj.carId){
			this.setState({
	    		carId: obj.carId,
	    		latitude: obj.lat,
				longitude: obj.lng,
				heading: obj.rotation,
	    		speed: obj.speed
    		});
		}
    }

	render(){
		return (
			<div className="bus-container">
				<table>
					<thead className="bus-header">
						<tr>
							<th colSpan="2">Vehicle Details</th>
						</tr>
					</thead>	
					<tbody>
						<tr>
							<td colSpan="2"/>
						</tr>
						<tr>
							<td>ID</td>
							<td>{this.state.carId}</td>
						</tr>
						<tr>
							<td>Latitude</td>
							<td>{this.state.latitude} </td>
						</tr>
						<tr>
							<td>Longitude</td>
							<td>{this.state.longitude}</td>
						</tr>
						<tr>
							<td>Speed</td>
							<td>{this.state.speed > 0 ? this.state.speed + ' mph' : ""}</td>
						</tr>
						<tr>
							<td>Heading</td>
							<td>{this.state.heading}</td>
						</tr>
						{this.state.laneId &&
						<tr>
							<td>Lane ID</td>
							<td>{this.state.laneId}</td>
						</tr>
						}
					</tbody>
				</table>
			  </div>
		);
	}
}
