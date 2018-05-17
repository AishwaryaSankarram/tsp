import React from 'react';

export const LogComponent = (props) => {
        let currentLogs = props.logs;
        let logsElement;
        if (currentLogs && currentLogs.length !== 0) {
            logsElement = currentLogs.map((log, index) => {
                return (
                    <div className="text-content" key={"log_" + index}>
                        {log}
                    </div>
                );
            });
        } else {
            logsElement = (
                <div className="text-content" key={"log_none"}>
                    <br />
                    <em>No Logs To Display</em>
                </div>

            );
        }

        return (
            <div className="log-content">
                {logsElement}
            </div>
        );
}
