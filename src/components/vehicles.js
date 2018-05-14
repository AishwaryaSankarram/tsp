import React from 'react';
import { Marker } from 'react-google-maps';
import carIcon from '../images/car';
import busIcon from '../images/bus-icon';


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
        this.displayBSM = this.displayBSM.bind(this);
    }


    startSocket() {
        var self = this;
        //Mouli's socket Starts--------------------------
        // setTimeout(function(){
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
        // this.startSocket();
        window.socket.on("bsm", this.displayBSM);
    }

    displayBSM(data){
        console.info("BSM Info received in event", "bsm", data);
    }

    placeCars(data){
        let self = this;
        let markers = self.state.markers;
        let mainCar = {};
        // console.log("CarData=======>", data, typeof(data));
        for(let i=0; i<data.length; i++){
            let car = data[i];
            markers[car.carId] = {carId: car.carId, overview_poly: car.poly, isEv: car.useAsEv, color: car.color,
                                    carLabel: car.carLabel,  lng: car.poly[0].lng, speed: car.poly[0].speed, rotation: 0};
            if(car.useAsEv)
                mainCar = markers[car.carId];
        }
        if(!mainCar.carId){
            mainCar = data[0];
            mainCar.lat = data[0].poly[0].lat;
            mainCar.lng = data[0].poly[0].lng;
            mainCar.speed = data[0].poly[0].speed
        }
        // self.checkForExistingBounds(mainCar);
        // self.setState({ markers: markers});
        window.socket.on("mockBsm", function(e) { self.updateMeth(e, markers); } );
    }

    updateMeth(data, markers) {
        let self = this;
        let jsonData = JSON.parse(data);
        let currentCar = markers[jsonData.carId];
        var heading = 0;

        if(currentCar){
            let p = new google.maps.LatLng(jsonData.lat, jsonData.lng);
            if(currentCar.lat){
                let lastPosn = new google.maps.LatLng(currentCar.lat,currentCar.lng);
                heading = google.maps.geometry.spherical.computeHeading(lastPosn,p);
            }
            currentCar.lat = jsonData.lat;
            currentCar.lng = jsonData.lng;
            currentCar.rotation = heading;
            if(currentCar.isEv){
              self.props.vehicle.updateData(currentCar);
              self.checkForExistingBounds(p);
            }
        }else{ //Car details were not avl earlier
            markers[jsonData.carId] = { lat: jsonData.lat, lng: jsonData.lng, carId: jsonData.carId, rotation: heading };
        }
        self.setState({ markers: markers});
    }


    checkForExistingBounds(latLng){
        // let latLng = new google.maps.LatLng(pos.lat, pos.lng);
        let self = this;
        let map = self.props.mapObj;
        // window.myMap = map;
        if (!map.getBounds().contains(latLng)) {
            // console.log("new lat lng not in bounds----");
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
          cIcon.rotation=marker.rotation;
          // cIcon['fillColor'] = marker.color;

          let bus = busIcon.replace(/rotateDeg/g, -1 * marker.rotation);
          let bIcon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(bus),
                       scaledSize: new google.maps.Size(50, 50)
                      };
          let icon = marker.isEv ? bIcon : cIcon;                      
          m.push(<Marker  key={marker.carId} position={{lat: marker.lat, lng: marker.lng}}
                          icon={icon} title={marker.carLabel} />
                );
        }
        return <div className="my-marker-test"> { m } </div> ;
    }
}
