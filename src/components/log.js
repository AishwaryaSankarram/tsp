import React from 'react';

export const LogComponent = (props) => {
        let currentLogs = props.logs;
        let logsElement;
        if (currentLogs && currentLogs.length !== 0) {
            logsElement = currentLogs.map((log, index) => {
                return (
                    <div className="text-content" key={"log_" + index}>
                        <div className={log.className}> <div className="main-timestamp"> {new Date(log.timestamp).toLocaleString()}  </div> <label> - {log.label} </label> <div className="log-inner-content">{log.content}</div> </div>
                    </div>
                );
            });
        } else {
            logsElement = (
                <div className="empty-content" key={"log_none"}>
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
