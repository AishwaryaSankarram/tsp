import React from 'react';

export const LogComponent = (props) => {
        let currentLogs = props.logs;
        let logsElement;
        if (currentLogs && currentLogs.length !== 0) {
            logsElement = currentLogs.map((log, index) => {
                return (
                    <div className="text-content" key={"log_" + index}>
                         <div className={log.className}> {log.timestamp} - <label> {log.label} </label> {log.content} </div>
                    </div>
                );
            });
        } else {
            logsElement = (
                <div className="text-content" key={"log_none"}>
                    <br />
                    <em>No logs to display.</em>
                </div>

            );
        }

        return (
            <div className="log-content">
                {logsElement}
            </div>
        );
}
