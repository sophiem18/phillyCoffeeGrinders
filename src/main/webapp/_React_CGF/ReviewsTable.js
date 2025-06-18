"use strict";

function callInsertReview() {
    window.location.hash = "#/cafeReviewInsert";
}

const ReviewsTable = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: "asc" });

    React.useEffect(() => {
        ajax_alt(
            "cafeReview/getAll",
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    setDbList(dbList.cafeReviewList);
                    setFilteredList(dbList.cafeReviewList);
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
            setFilteredList([...dbList]); // Reset to full list
            return;
        }

        const newList = filterObjList(dbList, filterInputVal);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        setFilteredList([...dbList]);
    };

    const sortByProp = (propName, sortType) => {
        let listToSort = filterInput ? [...filteredList] : [...dbList];

        jsSort(listToSort, propName, sortType);

        let direction = "asc";
        if (sortConfig.key === propName && sortConfig.direction === "asc") {
            direction = "desc";
            listToSort.reverse();
        }

        setSortConfig({ key: propName, direction });
        setFilteredList(listToSort);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="clickSort">
            <h3>
                Filterable and Sortable Review List &nbsp;
                <img src="icons/insert.png" onClick={callInsertReview} title="Insert new review" />
                &nbsp;
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
                        <th onClick={() => sortByProp("reviewTitle", "text")}>
                            <img src="icons/sortUpDown16.png" /> Review Title
                        </th>
                        <th onClick={() => sortByProp("cafeName", "text")}>
                            <img src="icons/sortUpDown16.png" /> Cafe Name
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th onClick={() => sortByProp("orderName", "text")}>
                            <img src="icons/sortUpDown16.png" /> Order Name
                        </th>
                        <th onClick={() => sortByProp("priceOrder", "decimal")} className="textAlignRight">
                            <img src="icons/sortUpDown16.png" /> Order Cost
                        </th>
                        <th onClick={() => sortByProp("ambianceScore", "number")} className="textAlignRight">
                            <img src="icons/sortUpDown16.png" /> Ambiance Score
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((review) => (
                        <tr key={review.reviewsID}>
                            <td>{review.reviewTitle}</td>
                            <td>{review.cafeName}</td>
                            <td className="simple textAlignCenter">
                                <img src={review.imageUrl} />
                            </td>
                            <td>{review.orderName}</td>
                            <td className="textAlignRight">{review.priceOrder}</td>
                            <td className="textAlignRight">{review.ambianceScore}</td>
                            <td>{review.errorMsg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
