import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import {LogComponent} from "../components/log";
import '../css/logs.css';
import { MuiThemeProvider } from 'material-ui/styles';

/* const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    }
}; */


export class LogContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [{
                carId: 123,
                latitude: 12345.96,
                longitude: 987456.389,
                speed: "110",
                distance: "30",
                laneId: "A1"
            }],
            showTabs: false,
            activeTab: "logs"

        };
        this.updateData = this.updateData.bind(this);
    } 
    
    componentDidMount() {
        console.log("Log div Did Mount------------");
        this.props.onLogsMount(this);
    }

    componentWillUnmount() {
        this.props.onLogsMount(null);
    }

    updateData(obj) {
      /*   if (obj.carId && obj.carId.length > 0) {
            this.setState({
                carId: obj.carId,
                latitude: obj.lat,
                longitude: obj.lng,
                speed: obj.speed
            });
        } */
    }

    handleChange = (value) => {
        this.setState({
            activeTab: value
        });
    };

    saveLogs(){
        console.log("Click on save logs----------");
    }

    clearLogs() {
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
                       <div>
                           <LogComponent logs={this.state.logs}/>
                       </div>
                   </Tab>
                   {this.state.showTabs &&
                   <Tab label="SRM" value="srm-tab" className="logs-header">
                       <div>
                           <p>
                               This is another example of a controllable tab. Remember, if you
                               use controllable Tabs, you need to give all of your tabs values or else
                               you wont be able to select them.
                            </p>
                       </div>
                   </Tab>}
                   {this.state.showTabs &&
                   <Tab label="SSM" value="ssm-tab" className="logs-header">
                       <div>
                           <p>
                              SSM Tab
                            </p>
                       </div>
                   </Tab>
                   }
               </Tabs>
            </div>
           </MuiThemeProvider>
        );
    }
}