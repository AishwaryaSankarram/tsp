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
			distance: "",
			laneId: ""
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
	    		speed: obj.speed
    		});
		}
    }

	render(){
		let html = <label> Vehicle Details </label>;
		return (
			<div className="bus-container">
				<div className="bus-header"> {html}
				</div>
				<label>ID:</label> {this.state.carId}<br/>
				<label>Latitude:</label> {this.state.latitude} <br/>
				<label>Longitude:</label> {this.state.longitude} <br/>
				<label>Speed</label>: {this.state.speed > 0 ? this.state.speed + ' mph' : ""} <br/>
  			</div>
		);
	}
}
