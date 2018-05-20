import React from 'react';

export const LogComponent = (props) => {

        let fakeLogs = <div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div><div class="text-content"><div class="srm-text"> 5/18/2018, 8:35:07 PM - <label> SRM </label>  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div></div>;


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
