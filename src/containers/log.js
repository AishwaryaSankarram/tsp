import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { LogComponent } from "../components/log";
import { LogDataComponent } from "../components/log-data";
import '../css/logs.css';
import { MuiThemeProvider } from 'material-ui/styles';
import DownloadLink from "react-download-link";

export class LogContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            srmInfo: null,
            ssmInfo: null,
            showTabs: false,
            activeTab: "logs"

        };
        this.updateData = this.updateData.bind(this);
        this.openTabs = this.openTabs.bind(this);
    }

    componentDidMount() {
        this.props.onLogsMount(this);
    }

    componentWillUnmount() {
        this.props.onLogsMount(null);
    }

    updateData(obj) {
        let logs = this.state.logs;
        logs.unshift(obj);
        this.setState({logs: logs});
    }

    handleChange = (value) => {
        this.setState({
            activeTab: value
        });
    };

    openTabs(msgType, srmData, ssmData) {
        if(msgType === 'srm'){
            this.setState({ showTabs: true, activeTab: "srm-tab", srmInfo: srmData, ssmInfo: ssmData});
        }else{
            this.setState({ showTabs: true, activeTab: "ssm-tab", srmInfo: srmData, ssmInfo: ssmData });
        }
    }

    clearLogs() {
      console.log("CLEARING FROM LOGS COMPONENT");
        this.setState({
            logs: []
        });
    }

    render() {
       return (
           <MuiThemeProvider>
            <div className="log-container">

               <Tabs
                   value={this.state.activeTab}
                   onChange={this.handleChange}
               >
                   <Tab label="Logs" value="logs" className="logs-header">
                        <div className="logs-header">
                            <div className="clear-logs" onClick={this.clearLogs.bind(this)}>Clear</div>
                               <DownloadLink
                                   className="clear-logs"
                                   tagName="div" 
                                   filename={"device_logs_" + new Date().getTime() + ".txt"}
                                   exportFile={() => JSON.stringify(this.state.logs)}>
                                   Save
                                </DownloadLink>
                        </div>
                        <br/>
                        <LogComponent logs={this.state.logs}/>
                   </Tab>

                   <Tab label="SRM" value="srm-tab" className="logs-header">
                       <div>
                          <LogDataComponent data={this.state.srmInfo}/>
                       </div>
                   </Tab>

                   <Tab label="SSM" value="ssm-tab" className="logs-header">
                       <div>
                               {this.state.ssmInfo ? JSON.stringify(this.state.ssmInfo) : <div className="text-content" key={"ssm_none"}>
                                   <br />
                                   <em>No Data To Display</em>
                               </div>}
                       </div>
                   </Tab>
                   
               </Tabs>
            </div>
           </MuiThemeProvider>
        );
    }
}
