"use strict";  

function GetProfileR() {
    const [profile, setProfile] = React.useState(null);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        fetch("getProfileAPI")
            .then(response => response.json())
            .then(data => {
                if (data.errorMsg) {
                    setError(data.errorMsg);
                } else {
                    setProfile(data);
                }
            })
            .catch(err => setError("AJAX error: " + err));
    }, []);

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!profile) return <p>Loading...</p>;

    return (
        <div>
        {error
            ? <p style={{ color: "red", textAlign: "center", marginTop: "40px" }}>{error}</p>
            : <UserProfileDisplay user={profile} />
        }
        </div>
    );
}
