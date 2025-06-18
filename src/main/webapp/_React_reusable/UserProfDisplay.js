"use strict";


function UserProfileDisplay({ user }) {
    if (!user) return null;

    return (
        <div style={{
            maxWidth: "400px",
            margin: "40px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
            fontFamily: "sans-serif",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
            <h2>Welcome Web User #{user.webUserId}</h2>
            <p><strong>Email:</strong> {user.userEmail}</p>
            <p><strong>Birthday:</strong> {user.birthday}</p>
            <p><strong>Membership Fee:</strong> ${user.membershipFee}</p>
            <p><strong>Role:</strong> {user.userRoleType}</p>
            {user.image &&
                <img
                    src={user.image}
                    alt="User"
                    style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "15px" }}
                />
            }
        </div>
    );
}
