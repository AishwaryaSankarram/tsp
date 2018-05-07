import React from 'react';
import { withGoogleMap, GoogleMap} from "react-google-maps";
import { compose, lifecycle} from "recompose";
import {Vehicles} from './vehicles';

export const MapComponent = compose(
  lifecycle({
     componentDidMount() {
       const refs = {};
       this.setState({ setZoom: ref => {
           refs.map = ref;
           if (!ref) {
             return;
           }
           console.log("setzooom===>" + refs.map);
           this.setState({ mapObj: refs.map});
         } });
     }
 	}),
 	withGoogleMap)(props => (
    <GoogleMap
       ref={props.setZoom}
       defaultOptions={{
         scaleControl: true,
       }}
       options={{
         scaleControl: true,
       }}
       defaultZoom={20}
       mapTypeId="roadmap"
       defaultCenter={{lat: 42.331280891921075, lng: -83.0733836184375}}
      // defaultCenter={{ lat: 13.178227, lng: 79.611750 }}
     >
     {console.log("props in maps------------", props)}
     <Vehicles mapObj={props.mapObj} vehicle={props.vehicle} /> 
    </GoogleMap>
));