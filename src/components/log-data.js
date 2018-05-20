import React, { Component } from 'react';
import '../css/logs.css';

export class LogDataComponent extends Component {
    render() {
        let data = this.props.data;
        console.log("SRM DATA", data);
        let content;
        if(data && data.hasOwnProperty('Request_id')){
            content = (
                <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2"> SRM Details - {data.Request_id}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Latitude
                            </td>
                            <td>
                                {data.Current_Lat}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Longitude
                            </td>
                            <td>
                                {data.Current_Lon}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Intersection ID
                            </td>
                            <td>
                                {data.Msg_type == "SRM" ?  data.Msg_Data.srm_list[0].Signal_Request.IntersectionId : data.Msg_Data.ssm_list[0].IntersectionId }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Sent At
                            </td>
                            <td>
                                {new Date(data.timestamp).toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="message-content">
                    <label> Message Data</label>
                    <div> {JSON.stringify(data.Msg_Data)} </div>
                </div>
            </div>
        );
        }else{
            content =(
                <div>
                 <br />
                       <em>No data to display.</em>
                </div>
            );
        }
        return (
            <div className="log-content"> {content} </div>
        );
    }
}
