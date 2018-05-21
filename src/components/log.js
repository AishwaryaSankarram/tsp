import React from 'react';

export const LogComponent = (props) => {

/*     let fakeLogs = (<div><div className="text-content"><div className="srm-text"> <div className="main-timestamp">  5/18/2018, 8:35:07 PM </div> - <label> SRM </label>   <div className="log-inner-content">  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div> </div></div>
        <div className="text-content"><div className="srm-text"><div className="main-timestamp">  5/18/2018, 8:35:07 PM -</div> <label> SRM </label> <div className="log-inner-content"> with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div></div>
            <div className="text-content"><div className="srm-text"><div className="main-timestamp">  5/18/2018, 8:35:07 PM -</div> <label> SRM </label> <div className="log-inner-content">  with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div></div>
            <div className="text-content"><div className="srm-text"> <div className="main-timestamp"> 5/18/2018, 8:35:07 PM - </div><label> SRM </label>  <div className="log-inner-content">with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div></div>
            <div className="text-content"><div className="srm-text"> <div className="main-timestamp"> 5/18/2018, 8:35:07 PM - </div><label> SRM </label> <div className="log-inner-content"> with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div></div>
            <div className="text-content"><div className="srm-text"> <div className="main-timestamp"> 5/18/2018, 8:35:07 PM - </div><label> SRM </label> <div className="log-inner-content"> with request ID 100 sent by 1234 at 37.3522, -121.968483333</div></div></div>
            <div className="text-content"><div className="srm-text"><div className="main-timestamp">  5/18/2018, 8:35:07 PM -</div> <label> SRM </label> <div className="log-inner-content"> with request ID 100 sent by 1234 at 37.3522, -121.968483333</div></div></div>
            <div className="text-content"><div className="srm-text"><div className="main-timestamp">  5/18/2018, 8:35:07 PM -</div> <label> SRM </label> <div className="log-inner-content"> with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div></div>
            <div className="text-content"><div className="srm-text"><div className="main-timestamp">  5/18/2018, 8:35:07 PM -</div> <label> SRM </label> <div className="log-inner-content"> with request ID 100 sent by 1234 at 37.3522, -121.968483333 </div></div></div>
    </div>); */


        let currentLogs = props.logs;
        let logsElement;
        if (currentLogs && currentLogs.length !== 0) {
            logsElement = currentLogs.map((log, index) => {
                return (
                    <div className="text-content" key={"log_" + index}>
                        <div className={log.className}> <div className="main-timestamp"> {log.timestamp}  </div> <label> - {log.label} </label> <div className="log-inner-content">{log.content}</div> </div>
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
