import React from 'react';
import { Marker } from 'react-google-maps';
import carIcon from '../images/bus';
import openSocket from 'socket.io-client';

let google = window.google;
let latLngBounds = new google.maps.LatLngBounds();

export class Vehicles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: {}//{1: {carId: "1", lat:13.181953, lng:79.608065}}
        };
        this.updateMeth = this.updateMeth.bind(this);
        this.placeCars = this.placeCars.bind(this);
        this.checkForExistingBounds = this.checkForExistingBounds.bind(this);
    }


    startSocket() {
        var self = this;
        //Mouli's socket Starts--------------------------
        // setTimeout(function(){
        window.socket = openSocket("http://192.168.1.3:8808", { transports: ['websocket'] });
        let socket = window.socket;
        console.log("openSocket------", socket);
        socket.emit("carDetails", "hello---"); //Trigger Car Details Event
        socket.on("carDetails", self.placeCars);
        socket.on("connect_error", function(e) {
            console.log("Errro ", e);
        });
        socket.on('disconnect', function() {
            console.log("Connection has been disconnected");
        });
        // },250);
        //Mouli's socket Ends--------------------------
    }

    componentDidMount() {
        console.log("Marker comp did Mount------------");
        this.startSocket();
    }

    placeCars(data){
        let self = this;
        let markers = self.state.markers;
        let mainCar = {};
        console.log("CarData=======>", data, typeof(data));
        for(let i=0; i<data.length; i++){
            let car = data[i];
            markers[car.carId] = {carId: car.carId, overview_poly: car.poly, isEv: car.useAsEv, color: car.color,
                                    carLabel: car.carLabel, lat: car.poly[0].lat, lng: car.poly[0].lng};
            if(car.useAsEv)
                mainCar = car;
        } 
        // let socket = window.socket;
        if(!mainCar.carId)
            mainCar=data[0];
        console.log("vehicleComp in bus---------", self.props.vehicle);
        self.props.vehicle.updateData(mainCar);
        self.checkForExistingBounds(mainCar);
        // self.setState({ markers: markers});
        // socket.on("mockBsm", function(e) { self.updateMeth(e, markers); } );
    }

    updateMeth(data, markers) {
        let self = this;
        let jsonData = JSON.parse(data);
        let currentCar = markers[jsonData.carId];

        if(currentCar){
            currentCar.lat = jsonData.lat;
            currentCar.lng = jsonData.lng;
        if(currentCar.isEv){
          let pos = { lat: jsonData.lat, lng: jsonData.lng };
          self.checkForExistingBounds(pos);  
        }
        }else{
            markers[jsonData.carId] = { lat: jsonData.lat, lng: jsonData.lng, carId: jsonData.carId };
        }
        self.setState({ markers: markers});
    }


    checkForExistingBounds(pos){
        let latLng = new window.google.maps.LatLng(pos.lat, pos.lng);    
        let self = this;
        let map = self.props.mapObj;
        // window.myMap = map;
        if (!map.getBounds().contains(latLng)) {
            console.log("new lat lng not in bounds----");
            latLngBounds.extend(latLng);
            // map.fitBounds(latLngBounds);
            map.panTo(latLng);
        }
    }

    render() {
        let m=[], markers = this.state.markers;
        for(var car in markers){
          let marker = markers[car];
          let cIcon = Object.assign({}, carIcon);
          cIcon.rotation=45;  
          cIcon['fillColor'] = marker.color;
          m.push(<div>
                <Marker key={marker.carId} position={{lat: marker.lat, lng: marker.lng}}
                          icon={cIcon} title={marker.carLabel} />
                </div>);
        }
        return <div> { m } </div> ;
    }
}