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
        this.processBSM = this.processBSM.bind(this);
        this.checkForExistingBounds = this.checkForExistingBounds.bind(this);
        this.alwaysFocus = this.alwaysFocus.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    componentDidMount() {
        this.props.onMount(this);
        window.socket.on("bsm", this.processBSM);
    }

    componentWillUnmount() {
       this.props.onMount(null);
    }

    clearData(data){
       this.setState({markers: {}});
    }

    processBSM(d) {
        let self = this;
        let data = JSON.parse(d);
        // console.info("BSM Info received in event", "bsm", data);
        let cars = self.state.markers;
        //{"Speed":0.59,"Heading":26.96,"Msg_type":"BSM","Device_Type":"OBU","Latitude":13.048968833,"vehicle_id":90, "Direction":"TX","Longitude":80.252762667,"timestamp":1526469989603}
        let currentCar = cars[data.vehicle_id];
        let flag = true;
        if (currentCar) {
            if(currentCar.lat === data.Latitude && currentCar.lng === data.Longitude){ //Don't refresh state when the vehicle has no movement
                flag = false;
            }else{
                currentCar.rotation = data.Heading;
                currentCar.lat = data.Latitude;
                currentCar.lng = data.Longitude;
                currentCar.speed = data.Speed;
                currentCar.timestamp = data.timestamp;
                currentCar.laneId = data.Lane_Id;
                let p = currentCar.path; //Never use Array#push here. It'll work incorrectly with PolyLine due to state mutation
                currentCar.path = p.concat([{ lat: data.Latitude, lng: data.Longitude }]);
            }
        } else {
            currentCar = {
                useAsEv: data.Direction === 'TX' ? true : false,
                carId: data.vehicle_id, rotation: data.Heading, speed: data.Speed, lat: data.Latitude, lng: data.Longitude, timestamp: data.timestamp, laneId: data.Lane_Id,
                path: [{lat: data.Latitude, lng: data.Longitude}]
            }
        }
        if(flag){
            if (currentCar.useAsEv) {
                let latLng = new google.maps.LatLng(currentCar.lat, currentCar.lng);
                if(self.props.focusBus){
                   self.alwaysFocus(latLng);
                }else{
                    self.checkForExistingBounds(latLng);
                }
                self.props.vehicle.updateData(currentCar);
            }
            cars[data.vehicle_id] = currentCar;
            self.setState({ markers: cars });
        }
    }

    alwaysFocus(latLng){
        let self = this;
        let map = self.props.mapObj;
        map.panTo(latLng);   
    }


    checkForExistingBounds(latLng){
        let self = this;
        let map = self.props.mapObj;
        // window.myMap = map;
        if (!map.getBounds().contains(latLng)) {
            map.panTo(latLng);
            // console.log("new lat lng not in bounds----");
            //latLngBounds.extend(latLng);
            //map.fitBounds(latLngBounds);

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
                       scaledSize: new google.maps.Size(40, 40),
                       anchor: new google.maps.Point(20, 20)
                      };
          let icon = marker.useAsEv ? bIcon : cIcon;
            m.push(<div key={"vehicle_div_" + marker.carId}>
                    <Marker key={marker.carId} position={{ lat: marker.lat, lng: marker.lng }} title={marker.carId.toString()} icon={icon} />
                    <Polyline key={'poly_' + marker.carId} path={marker.path} options={lineOptions} />
                   </div>
                );
        }
        return <div className="vehicle-wrapper-container"> { m } </div> ;
    }
}
