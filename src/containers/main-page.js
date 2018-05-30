import React, {Component} from 'react';
import {MapContainer} from './map';
import {VehicleContainer} from './vehicle';
import {LogContainer} from './log';
import { SignalPanel } from './signal-panel';

import { toast } from 'react-toastify';

import { enableNotifications, isLogsExpanded, focusBus} from '../constants.js';



export class MainPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			vehicle: 0,
			logs: null,
			signalPanel: null,
			isLogsExpanded: isLogsExpanded,
			enableNotifications: enableNotifications,
			focusBus: focusBus
		};
		this.clearData = this.clearData.bind(this);
		this.addLogs = this.addLogs.bind(this);
		this.requestToToast = {};
	}

	clearData() {
		// console.log("CLEARING FROM MAINPAGE COMPONENT");
		this.state.vehicle.clearData();
		this.state.logs.clearLogs();
		this.vehicles.clearData();
		this.srm.clearData();
		this.ssm.clearData();
		this.intermarker.clearData();
	}


	srmsent(toastID, requestID) {
		// console.log("SRM SENT ID =>", toastID);
		this.requestToToast[requestID] = toastID;
		// console.log("REQUEST TO TOAST HASH", this.requestToToast);
	 }

	 updatesrm(requestID, string) {
		 let toastID = this.requestToToast[requestID.toString()];
		 toast.update(toastID, {
			 render: string,
			 autoClose: 10000
		 })

	 }

	ssmsent(requestID, status) {
			let string = "Signal Request " + status + "!"
			if(status === "granted") {
				toast.success(string, {
	         position: toast.POSITION.TOP_LEFT,
	         autoClose: 10000
	       });
			} else {
				toast.error(string, {
	         position: toast.POSITION.TOP_LEFT,
	         autoClose: 10000
	       });
			}

	}


	srmEnable(state) {
		this.srm.enable(state);
	}

	ssmEnable(state) {
		this.ssm.enable(state);
	}

	sendToIntMarker(color, isec_id) {
		this.intermarker.updateSignalData(color, isec_id);
	}

	disableAllInterSignals(isec_id) {
		this.intermarker.clearSignal(isec_id);
	}

	componentDidMount() {
		this.props.handleMount(this);
	}

	componentWillUnmount() {
		this.props.handleMount(null);
	}

	handleSignalPanelMount(obj) {
		this.setState({signalPanel: obj})
	}

	handleVehicleMount(obj){
		this.setState({vehicle: obj});
	}

	handleLogsMount(obj){
		this.setState({logs: obj});
	}

	fetchSSMandUpdateLogs(srmInfo){
		let ssmData = this.ssm.state.ssmInfo;
		let ssm = ssmData[srmInfo.Request_id];
		if(!ssm){
			ssm = {};
		}
		this.state.logs.openTabs("srm", srmInfo, ssm);
	}

	addLogs(message){
		this.state.logs.updateData(message);
	}

	addNotifications(message){
		this.state.logs.addNotifications(message);
	}

	fetchSRMandUpdateLogs(ssmInfo) {
		let srmData = this.srm.state.srmData;
		let srm = srmData[ssmInfo.Request_id];
		if(!srm){
			srm = {};
		}
		this.state.logs.openTabs("ssm", srm, ssmInfo);
	}

	toggleLogView(){
		this.setState({isLogsExpanded: !this.state.isLogsExpanded})
	}

	toggleNotifications(state){
		let isLogsExpanded = this.state.isLogsExpanded;
		if (!state) {//On disabling notifications, bring back logs to normal mode
			isLogsExpanded = false;
		}
		this.setState({ enableNotifications: state, isLogsExpanded: isLogsExpanded });
	}

	toggleBus(state){
		this.setState({ focusBus: state })
	}

	srmSent(id) {
		this.state.signalPanel.highlightSignal(id);
	}



	render(){
		return (
			<div className="main-page">
				<div className={this.state.isLogsExpanded ? "hide" : this.state.enableNotifications ? "left-panel" : "full-left"}>
					<div  className="top-panel">
						<SignalPanel
						 onSignalPanelMount={this.handleSignalPanelMount.bind(this)} addLogs={this.addLogs}
						  showNotifications={this.addNotifications.bind(this)}sendToIntMarker={this.sendToIntMarker.bind(this)}
							clearAllInterSignals={this.disableAllInterSignals.bind(this)}/>
						<VehicleContainer onVehicleMount={this.handleVehicleMount.bind(this)} />
					</div>
					<div className="bottom-panel">
						<MapContainer signalpanel={this.state.signalPanel}
						srmsent={this.srmsent.bind(this)}
						updatesrm={this.updatesrm.bind(this)}
						ssmsent={this.ssmsent.bind(this)}
					 	fetchSSM={this.fetchSSMandUpdateLogs.bind(this)}
						fetchSRM={this.fetchSRMandUpdateLogs.bind(this)} addLogs={this.addLogs} onBusMount={ref => (this.vehicles = ref)}
						onSrmMount={ref => (this.srm = ref)} onSsmMount={ref => (this.ssm = ref)}
						onInterMarkerMount={ref => (this.intermarker = ref)}
						vehicle={this.state.vehicle} focusBus={this.state.focusBus}
						showNotifications={this.addNotifications.bind(this)}/>
					</div>
				</div>
				<div className={this.state.enableNotifications ? (this.state.isLogsExpanded ? "full-right" : "right-panel") : "hide"}>
					<div className="side-panel">
						<LogContainer onLogsMount={this.handleLogsMount.bind(this)} toggleLogs={this.toggleLogView.bind(this)} isExpanded={this.state.isLogsExpanded}/>
					</div>
				</div>
  			</div>
		);
	}
}
