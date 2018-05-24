import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { LogComponent } from "../components/log";
import { LogDataComponent } from "../components/log-data";
import { NotificationComponent } from "../components/notifications";
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
            notifications: [],
            activeTab: "notifications"

        };
        this.updateData = this.updateData.bind(this);
        this.addNotifications = this.addNotifications.bind(this);
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

    addNotifications(obj){
        let notifications = this.state.notifications;
        notifications.unshift(obj);
        this.setState({ notifications: notifications });
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
      // console.log("CLEARING FROM LOGS COMPONENT");
        this.setState({
            logs: []
        });
    }

    getFileContent(){
        let content = [];
        let l = this.state.logs;
        for(let i = 0; i < l.length; i++){
            content.push(l[i].timestamp + " " + l[i].label + " " + l[i].content)
        }
        return content.join('\n');
    }


    render() {
       return (
           <MuiThemeProvider>
            <div className="log-container">
                   <div className={this.props.isExpanded ? "fa fa-compress logs_expand" : "fa fa-expand logs_expand"} title={this.props.isExpanded ? "Collapse logs to original view" : "Show logs in expanded view"} onClick={this.props.toggleLogs}></div>
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
                                   exportFile={this.getFileContent.bind(this)}>
                                   Save
                                </DownloadLink>
                        </div>
                        <br/>
                        <LogComponent logs={this.state.logs}/>
                   </Tab>
                    
                   <Tab label="Notifications" value="notifications" className="logs-header">
                        <NotificationComponent data={this.state.notifications}/>
                   </Tab>

                   <Tab label="SRM" value="srm-tab" className="logs-header">
                       <div>
                          <LogDataComponent data={this.state.srmInfo}/>
                       </div>
                   </Tab>

                   <Tab label="SSM" value="ssm-tab" className="logs-header">
                       <div>
                               <LogDataComponent data={this.state.ssmInfo} />
                       </div>
                   </Tab>

               </Tabs>
            </div>
           </MuiThemeProvider>
        );
    }
}
