"use strict";

function callInsert() {
    window.location.hash = "#/userInsert";
}
const UserTable = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: "asc" });

    React.useEffect(() => {
        ajax_alt(
            "webUser/getAll",
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    setDbList(dbList.webUserList);
                    setFilteredList(dbList.webUserList);
                }
                setIsLoading(false);
            },
            function (msg) {
                setError(msg);
                setIsLoading(false);
            }
        );
    }, []);

    const doFilter = (filterInputVal) => {
        setFilterInput(filterInputVal);

        if (filterInputVal.trim() === "") {
            setFilteredList([...dbList]); // Reset to full list when filter is empty
            return;
        }

        const newList = filterObjList(dbList, filterInputVal);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        setFilteredList([...dbList]); // Reset to full list
    };

    const sortByProp = (propName, sortType) => {
        let listToSort = filterInput ? [...filteredList] : [...dbList]; // Sort filtered or full list

        jsSort(listToSort, propName, sortType);

        let direction = "asc";
        if (sortConfig.key === propName && sortConfig.direction === "asc") {
            direction = "desc";
            listToSort.reverse(); // Toggle sorting order
        }

        setSortConfig({ key: propName, direction });
        setFilteredList(listToSort);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="clickSort">
            <h3>
                Filterable and Sortable User List &nbsp;
                <img src="icons/insert.png" onClick={callInsert} title="Insert a new user" />  &nbsp;
                <input
                    value={filterInput}
                    onChange={(e) => setFilterInput(e.target.value)}
                />
                &nbsp;
                <button onClick={() => doFilter(filterInput)}>Search</button> 
                &nbsp;
                <button onClick={clearFilter}>Clear</button>
            </h3>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortByProp("userEmail", "text")}>
                            <img src="icons/sortUpDown16.png" /> Email
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th onClick={() => sortByProp("birthday", "date")} className="textAlignCenter">
                            <img src="icons/sortUpDown16.png" /> Birthday
                        </th>
                        <th onClick={() => sortByProp("membershipFee", "number")} className="textAlignRight">
                            <img src="icons/sortUpDown16.png" /> Membership Fee
                        </th>
                        <th onClick={() => sortByProp("userRoleType", "text")}>
                            <img src="icons/sortUpDown16.png" /> Role
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((user) => (
                        <tr key={user.webUserId}>
                            <td>{user.userEmail}</td>
                            <td className="shadowImage textAlignCenter">
                                <img src={user.userImage} />
                            </td>
                            <td className="textAlignCenter">{user.birthday}</td>
                            <td className="textAlignRight">{user.membershipFee}</td>
                            <td className="nowrap">{user.userRoleType}</td>
                            <td>{user.errorMsg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
