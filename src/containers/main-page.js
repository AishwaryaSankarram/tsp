import React, {Component} from 'react';
import {MapContainer} from './map';
import {VehicleContainer} from './vehicle';
import {LogContainer} from './log';
import { SignalPanel } from './signal-panel';


export class MainPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			vehicle: 0,
			logs: null,
			signalPanel: null
		};
		this.clearData = this.clearData.bind(this);
		this.addLogs = this.addLogs.bind(this);
	}

	clearData() {
		console.log("CLEARING FROM MAINPAGE COMPONENT");
		this.state.logs.clearLogs();
		this.srm.clearData();
		this.ssm.clearData();
	}

	srmEnable(state) {
		this.srm.enable(state);
	}

	ssmEnable(state) {
		this.ssm.enable(state);
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
		// console.log("ssmData=========", ssmData, srmInfo);
		let ssm = ssmData[srmInfo.Request_id];
		// console.log("ssm aft=========", ssm);
		if(!ssm){
			ssm = {};
		}
		console.log("SRMINFO ", srmInfo);
		this.state.logs.openTabs("srm", srmInfo, ssm);
	}

	addLogs(message){
		this.state.logs.updateData(message);
	}

	fetchSRMandUpdateLogs(ssmInfo) {
		let srmData = this.srm.state.srmData;
		// console.log("srmData=========", srmData, ssmInfo);
		let srm = srmData[ssmInfo.Request_id];
		// console.log("srm aft=========", srm);
		if(!srm){
			srm = {};
		}
		console.log("SSMINFO ", ssmInfo);
		this.state.logs.openTabs("ssm", srm, ssmInfo);
	}



	render(){
		return (
			<div className="main-page">
				<div className="left-panel">
					<div  className="top-panel">
						<SignalPanel onSignalPanelMount={this.handleSignalPanelMount.bind(this)} />
						<VehicleContainer onVehicleMount={this.handleVehicleMount.bind(this)} />
					</div>
					<div className="bottom-panel">
						<MapContainer signalpanel={this.state.signalPanel} fetchSSM={this.fetchSSMandUpdateLogs.bind(this)}
						fetchSRM={this.fetchSRMandUpdateLogs.bind(this)} addLogs={this.addLogs}
						onSrmMount={ref => (this.srm = ref)} onSsmMount={ref => (this.ssm = ref)} vehicle={this.state.vehicle} />
					</div>
				</div>
				<div className="right-panel">
					<div className="side-panel">
						<LogContainer onLogsMount={this.handleLogsMount.bind(this)} />
					</div>
				</div>
  			</div>
		);
	}
}
