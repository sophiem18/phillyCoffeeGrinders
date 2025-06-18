"use strict";

function LogoffR() {
    const [msg, setMsg] = React.useState("Logging off...");

    React.useEffect(() => {
        fetch("logoffAPI")
            .then(response => response.json())
            .then(data => setMsg(data.errorMsg))
            .catch(err => setMsg("AJAX error: " + err));
    }, []);

    return (
        <div>
            <h2>Log Off</h2>
            <p>{msg}</p>
        </div>
    );
}


