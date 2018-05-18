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
    	// console.log("Calling updateData in VehicleContainer", obj);
    	// {carId: car.carId, overview_poly: car.poly, isEv: car.useAsEv, color: car.color,
                                    // carLabel: car.carLabel, lat: car.poly[0].lat, lng: car.poly[0].lng};
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
		// let bus = busIcon.replace(/rotateDeg/g,0);
		let html = '<label> Vehicle Details </label>';
		return (
			<div className="bus-container">
				<div className="bus-header" dangerouslySetInnerHTML={{__html: html}}>
				</div>
				<label>ID:</label> {this.state.carId}<br/>
				<label>Latitude:</label> {this.state.latitude} <br/>
				<label>Longitude:</label> {this.state.longitude} <br/>
				<label>Speed</label>: {this.state.speed + ' mph'} <br/>
  			</div>
		);
	}
}
