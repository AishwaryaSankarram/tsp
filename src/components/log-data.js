import React, { Component } from 'react';
import '../css/logs.css';

export class LogDataComponent extends Component {
    render() {
        let data = this.props.data;
        let content;
        if(data){
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
                                {data.Msg_Data.srm_list[0].Signal_Request.IntersectionId}
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
