import React from 'react';

export const NotificationComponent = (props) => {

    let currentLogs = props.data;
    let logsElement;
    if (currentLogs && currentLogs.length !== 0) {
        logsElement = currentLogs.map((log, index) => {
            return (
                <div className="text-content" key={"notification_" + index}>
                    <div className="srm-text"> {log} </div>
                </div>
            );
        });
    } else {
        logsElement = (
            <div className="empty-content" key={"notifications_none"}>
                <br />
                <em>No notifications to display.</em>
            </div>

        );
    }

    return (
        <div className="log-content">
            {logsElement}
        </div>
    );
}

