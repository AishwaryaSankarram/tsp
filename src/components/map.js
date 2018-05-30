import React from 'react';
import { withGoogleMap, GoogleMap} from "react-google-maps";

import { compose, lifecycle} from "recompose";
import {Vehicles} from './vehicles';
import {InterMarkers} from './inter-markers.js';
import { SSMMarkers } from "./ssm-markers";
import {SRMMarkers} from "./srm-markers";

export const MapComponent = compose(
  lifecycle({
     componentDidMount() {
       const refs = {};
       this.setState({ setZoom: ref => {
           refs.map = ref;
           if (!ref) {
             return;
           }
           // console.log("setzooom===>" + refs.map);
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
         maxZoom: 21
       }}
       defaultZoom={18}
       mapTypeId="roadmap"
       defaultCenter={{lat: 42.331280891921075, lng: -83.0733836184375}}
      // defaultCenter={{ lat: 13.178227, lng: 79.611750 }}
     >
        <Vehicles mapObj={props.mapObj} vehicle={props.vehicle} onMount={props.onBusMount} focusBus={props.focusBus}/>
        <InterMarkers mapObj={props.mapObj} onMount={props.onInterMarkerMount} signalpanel={props.signalpanel} addLogs={props.addLogs} showNotifications={props.showNotifications}/>
        <SRMMarkers srmsent={props.srmsent} updatesrm={props.updatesrm} mapObj={props.mapObj} fetchSSM={props.fetchSSM} onMount={props.onSrmMount} addLogs={props.addLogs} showNotifications={props.showNotifications}/>
        <SSMMarkers mapObj={props.mapObj} ssmsent={props.ssmsent} fetchSRM={props.fetchSRM} onMount={props.onSsmMount} addLogs={props.addLogs} showNotifications={props.showNotifications}/>
    </GoogleMap>
));
