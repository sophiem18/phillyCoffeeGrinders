"use strict";

function LogonR() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [result, setResult] = React.useState(null);

    const handleLogin = () => {
        fetch(`logonAPI?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
            .then(response => response.json())
            .then(data => setResult(data))
            .catch(err => setResult({ errorMsg: "AJAX error: " + err }));
    };

    return (
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
            <h2>Log In</h2>
            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ margin: "10px", padding: "8px", width: "250px" }}
            /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ margin: "10px", padding: "8px", width: "250px" }}
            /><br />
            <button onClick={handleLogin} style={{ padding: "10px 20px" }}>Log In</button>

            {result && result.errorMsg
                ? <p style={{ color: "red", marginTop: "20px" }}>{result.errorMsg}</p>
                : <UserProfileDisplay user={result} />
            }
        </div>
    );
}
