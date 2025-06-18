"use strict"; // not sure if this is needed in react...

const UserInsertSimple = () => {

    // Set initial values of state variables and receive (from React) a setter function for each one.
    // In React, you create State Variables for anything that (if changed) needs to re-render the UI. 

    // Object (State Variable) that holds all the user entered data. Each 
    // property of this object is linked with a textbox for user input. 
    const [userData, setUserData] = React.useState(
        {
            "webUserId": "",
            "userEmail": "",
            "userPassword": "",
            "userPassword2": "",
            "userImage": "",
            "birthday": "",
            "membershipFee": "",
            "userRoleId": "",
            "errorMsg": ""
        }
    );


    // Object (State Variable) that holds all the error messages - field level 
    // and form/record level (errorMsg).
    const [errorObj, setErrorObj] = React.useState(
        {
            "webUserId": "",
            "userEmail": "",
            "userPassword": "",
            "userPassword2": "",
            "userImage": "",
            "birthday": "",
            "membershipFee": "",
            "userRoleId": "",
            "errorMsg": ""
        }
    );


    // By having this boolean state variable, we avoid rendering the component 
    // before we are ready to do so. 
    const [isLoading, setIsLoading] = React.useState(false);

    const encodeUserInput = () => {
        var userInputObj = {
            "webUserId": userData.webUserId,
            "userEmail": userData.userEmail,
            "userPassword": userData.userPassword,
            "userPassword2": userData.userPassword2,
            "userImage": userData.userImage,
            "birthday": userData.birthday,
            "membershipFee": userData.membershipFee,
            "userRoleId": userData.userRoleId
        };
        console.log("userInputObj on next line");
        console.log(userInputObj);
        // turn the user input object into JSON then run that through 
        // a URI encoder (needed for security on server side, prevents 
        // server from hacks). 
        //return encodeURIComponent(JSON.stringify(userInputObj));
        return encodeURI(JSON.stringify(userInputObj));
    };

    // If you just change the value of a State object's property, then React does not 
    // know that the object has been changed (and thus does re-render the UI). 
    // To get around this, I wrote function setProp that clones the object, changes 
    // the desired property, then returns the clone. THEN React knows that the object 
    // has been changed (and re-renders the UI). 
    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj); // makes a copy of the object
        o[propName] = propValue; // changes the property of the copy
        // console.log("setProp orig object is");
        // console.log(obj);
        // console.log("after changing " + propName + " to " + propValue + " the new obj is");
        // console.log(o);
        return o; // returns the object copy with the property's value changed.
    };

    // useEffect second parameter is an array of "watch elements" that 
    // (if they change) should trigger the function specified 
    // as the first useEffect parameter.


    const validate = () => {
        console.log("Validate, should kick off AJAX call");
        // action was set to insert or update above (must match web API @RequestMapping). 
        console.log("Here is the user data that will be sent to the insert/update API");
        console.log(userData);

        setIsLoading(true);
        ajax_alt("webUser/insert?jsonData=" + encodeUserInput(),

            function (obj) { // obj holds field level error messages
                console.log("These are the error messages (next line)");
                console.log(obj);

                if (obj.errorMsg.length === 0) {
                    // errorMsg = "" means no error, record was inserted (or updated). 
                    obj.errorMsg = "Record Saved !";
                }

                setErrorObj(obj); // show the field level error messages (will all be "" if record was inserted)
                setIsLoading(false);
            },
            function (ajaxErrorMsg) { // AJAX error msg trying to call the insert or update API
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsLoading(false);
            }
        );
    };

    if (isLoading) {
        return <div> ... Loading ... </div>;
    }

    return (
        <table className="insertArea">
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>
                        <input value={userData.webUserId} disabled />
                    </td>
                    <td className="error">
                        {errorObj.webUserId}
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <input value={userData.userEmail} onChange=
                            {e => setUserData(setProp(userData, "userEmail", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.userEmail}
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <input type="password" value={userData.userPassword} onChange=
                            {e => setUserData(setProp(userData, "userPassword", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.userPassword}
                    </td>
                </tr>
                <tr>
                    <td>Re-enter Password</td>
                    <td>
                        <input type="password" value={userData.userPassword2} onChange=
                            {e => setUserData(setProp(userData, "userPassword2", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.userPassword2}
                    </td>
                </tr>
                <tr>
                    <td>Image</td>
                    <td>
                        <input value={userData.userImage} onChange=
                            {e => setUserData(setProp(userData, "userImage", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.userImage}
                    </td>
                </tr>
                <tr>
                    <td>Birthday</td>
                    <td>
                        <input value={userData.birthday} onChange=
                            {e => setUserData(setProp(userData, "birthday", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.birthday}
                    </td>
                </tr>
                <tr>
                    <td>Membership Fee</td>
                    <td>
                        <input value={userData.membershipFee} onChange=
                            {e => setUserData(setProp(userData, "membershipFee", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.membershipFee}
                    </td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td>
                        <input value={userData.userRoleId} onChange=
                            {e => setUserData(setProp(userData, "userRoleId", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.userRoleId}
                    </td>
                </tr>
                <tr>
                    <td>
                        <br />
                        <button type="button" onClick={validate}>Save</button>
                    </td>
                    <td className="error" colSpan="2">
                        <div dangerouslySetInnerHTML={{ __html: errorObj.errorMsg }} />
                    </td>
                </tr>
            </tbody>
        </table>

    ); // ends the return statement

}; // end of function/component


/* 
 
 Example of web_user StringData output from insertUserAPI.jsp
 
 "webUserId": "1",
 "userEmail": "sallyk",
 "userPassword": "p",
 "userImage": "http://cis-linux2.temple.edu/~sallyk/pics_/sk_2017.jpg",
 "birthday": "",
 "membershipFee": "$123.45",
 "userRoleId": "2",
 "userRoleType": "Edit",
 "errorMsg": ""
 
 */