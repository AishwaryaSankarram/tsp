import React, {Component} from 'react';
import '../css/vehicle.css';

export class VehicleContainer extends Component{
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
        console.log("Vehicle Card Did Mount------------");
        this.props.onVehicleMount(this);
    }

    componentWillUnmount(){
    	this.props.onVehicleMount(null);	
    }

    updateData(obj){
    	console.log("Calling updateData in VehicleContainer      ", obj);
    	// {carId: car.carId, overview_poly: car.poly, isEv: car.useAsEv, color: car.color,
                                    // carLabel: car.carLabel, lat: car.poly[0].lat, lng: car.poly[0].lng};
		if(obj.carId){
			this.setState({
	    		carId: obj.carId,
	    		latitude: obj.lat,
	    		longitude: obj.lng,
    		});	
		}                                    
    }

	render(){
		return (
			<div className="bus-container">
				<label className="bus-header"> Vehicle Details </label>
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
