import React from 'react';
import { Marker, Polyline } from 'react-google-maps';
import carIcon from '../images/car';
import busIcon from '../images/bus-icon';


let google = window.google;

export class Vehicles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: {}//{1: {carId: "1", lat:13.181953, lng:79.608065, path: [{lat:13.181953, lng:79.608065}]}}
        };
        this.updateMeth = this.updateMeth.bind(this);
        this.processBSM = this.processBSM.bind(this);
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
            console.log("Errror ", e);
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
        // window.socket.on("bsm", this.displayBSM);
        window.socket.on("bsm", this.processBSM);
    }

    displayBSM(data){
        // console.info("BSM Info received in event", "bsm", data);
    }

    processBSM(d) {
        let self = this;
        let data = JSON.parse(d);
        // console.info("BSM Info received in event", "bsm", data);
        // { 1: { carId: "1", lat: 13.181953, lng: 79.608065 } }
        let cars = self.state.markers;
        //{"Speed":0.59,"Heading":26.96,"Msg_type":"BSM","Device_Type":"OBU","Latitude":13.048968833,"Vehicle_id":90,
        // "Direction":"TX","Longitude":80.252762667,"timestamp":1526469989603}
        let currentCar = cars[data.Vehicle_id];
        let flag = true;
        if (currentCar) {
            if(currentCar.lat === data.Latitude && currentCar.lng === data.Longitude){
                flag = false;
            }else{
                currentCar.rotation = data.Heading;
                currentCar.lat = data.Latitude;
                currentCar.lng = data.Longitude;
                currentCar.speed = data.Speed;
                currentCar.timestamp = data.timestamp;
                let p = currentCar.path; //Never use Array#push here. It'll work incorrectly with PolyLine due to state mutation
                currentCar.path = p.concat([({ lat: data.Latitude, lng: data.Longitude })]);
            }
        } else {
            currentCar = {
                useAsEv: data.Direction === 'TX' ? true : false,
                carId: data.Vehicle_id, rotation: data.Heading, speed: data.Speed, lat: data.Latitude, lng: data.Longitude, timestamp: data.timestamp,
                path: [{lat: data.Latitude, lng: data.Longitude}]
            }
        }
        if(flag){
            if (currentCar.useAsEv) {
                let latLng = new google.maps.LatLng(currentCar.lat, currentCar.lng);
                self.checkForExistingBounds(latLng);
                self.props.vehicle.updateData(currentCar);
            }
            cars[data.Vehicle_id] = currentCar;
            self.setState({ markers: cars });
        }
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
        //let latLng = new google.maps.LatLng(pos.lat, pos.lng);
        let self = this;
        let map = self.props.mapObj;

        // window.myMap = map;
        if (!map.getBounds().contains(latLng)) {
            // console.log("new lat lng not in bounds----");
            //latLngBounds.extend(latLng);
            //map.fitBounds(latLngBounds);
            map.panTo(latLng);

        }
    }

    render() {
        let m=[], markers = this.state.markers;
        for(let car in markers){
          let marker = markers[car];
          let cIcon = Object.assign({}, carIcon);
            let lineOptions = {
                strokeColor: "#33D4FF",
                strokeOpacity: 1.0,
                strokeWeight: 4,
                zIndex: 100
            };
          cIcon.rotation=marker.rotation;
          // cIcon['fillColor'] = marker.color;
          let bus = busIcon.replace(/rotateDeg/g, marker.rotation);
          let bIcon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(bus),
                       scaledSize: new google.maps.Size(100, 100),
                       anchor: new google.maps.Point(50, 50)
                      };
          let icon = marker.useAsEv ? bIcon : cIcon;
          m.push(<div key={"vehicle_div_" + marker.carId}><Marker  key={marker.carId} position={{lat: marker.lat, lng: marker.lng}}
                          icon={icon} />
                  <Polyline key={'poly_' + marker.carId} path={marker.path} options={lineOptions} />
                </div>
                );
        }
        return <div className="my-marker-test"> { m } </div> ;
    }
}
