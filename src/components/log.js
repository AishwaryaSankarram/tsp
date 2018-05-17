import React from 'react';

export const LogComponent = (props) => {
        let currentLogs = props.logs;
        let logsElement;
        if (currentLogs && currentLogs.length !== 0) {
            logsElement = currentLogs.map((log, index) => {
                return (
                    <div className="text-content" key={"log_" + index}>
                        <label>ID:</label> {log.carId}<br />
                        <label>Latitude:</label> {log.latitude} <br />
                        <label>Longitude:</label> {log.longitude} <br />
                        <label>Speed:</label> {log.speed + ' mph'} <br />
                    </div>
                );
            });
        } else {
            logsElement = (
                <div className="text-content" key={"log_none"}>
                    <br />
                    <strong>No Logs To Display</strong>
                </div>

            );
        }

        return (
            <div className="log-content">
                {logsElement}
            </div>
        );
}
