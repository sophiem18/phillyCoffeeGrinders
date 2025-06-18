"use strict";

const CafeReviewInsert = () => {
    const [reviewData, setReviewData] = React.useState({
        reviewsID: "",
        reviewTitle: "",
        cafeName: "",
        imageUrl: "",
        orderName: "",
        priceOrder: "",
        ambianceScore: "",
        userComment: "",
        userImage: "",
        userEmail: "",
        errorMsg: ""
    });

    const [errorObj, setErrorObj] = React.useState({ ...reviewData });

    const [isLoading, setIsLoading] = React.useState(false);

    const setProp = (obj, propName, propValue) => {
        let updated = Object.assign({}, obj);
        updated[propName] = propValue;
        return updated;
    };

    const encodeReviewInput = () => {
        return encodeURI(JSON.stringify(reviewData));
    };

    const validate = () => {
        setIsLoading(true);
        ajax_alt("cafeReview/insert?jsonData=" + encodeReviewInput(),
            (obj) => {
                if (obj.errorMsg.length === 0) {
                    obj.errorMsg = "Review Saved!";
                }
                setErrorObj(obj);
                setIsLoading(false);
            },
            (ajaxErrorMsg) => {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsLoading(false);
            }
        );
    };

    if (isLoading) return <div> ... Loading ... </div>;

    return (
        <table className="insertArea">
            <tbody>
                <tr><td>ID</td><td><input value={reviewData.reviewsID} disabled /></td><td className="error">{errorObj.reviewsID}</td></tr>
                <tr><td>Review Title</td><td><input value={reviewData.reviewTitle} onChange={e => setReviewData(setProp(reviewData, "reviewTitle", e.target.value))} /></td><td className="error">{errorObj.reviewTitle}</td></tr>
                <tr><td>Cafe Name</td><td><input value={reviewData.cafeName} onChange={e => setReviewData(setProp(reviewData, "cafeName", e.target.value))} /></td><td className="error">{errorObj.cafeName}</td></tr>
                <tr><td>Image URL</td><td><input value={reviewData.imageUrl} onChange={e => setReviewData(setProp(reviewData, "imageUrl", e.target.value))} /></td><td className="error">{errorObj.imageUrl}</td></tr>
                <tr><td>Order Name</td><td><input value={reviewData.orderName} onChange={e => setReviewData(setProp(reviewData, "orderName", e.target.value))} /></td><td className="error">{errorObj.orderName}</td></tr>
                <tr><td>Price of Order</td><td><input value={reviewData.priceOrder} onChange={e => setReviewData(setProp(reviewData, "priceOrder", e.target.value))} /></td><td className="error">{errorObj.priceOrder}</td></tr>
                <tr><td>Ambiance Score</td><td><input value={reviewData.ambianceScore} onChange={e => setReviewData(setProp(reviewData, "ambianceScore", e.target.value))} /></td><td className="error">{errorObj.ambianceScore}</td></tr>
                <tr><td>User Comment</td><td><textarea value={reviewData.userComment} onChange={e => setReviewData(setProp(reviewData, "userComment", e.target.value))} /></td><td className="error">{errorObj.userComment}</td></tr>
                <tr><td>User Image URL</td><td><input value={reviewData.userImage} onChange={e => setReviewData(setProp(reviewData, "userImage", e.target.value))} /></td><td className="error">{errorObj.userImage}</td></tr>
                <tr><td>User Email</td><td><input value={reviewData.userEmail} onChange={e => setReviewData(setProp(reviewData, "userEmail", e.target.value))} /></td><td className="error">{errorObj.userEmail}</td></tr>
                <tr><td><br /><button type="button" onClick={validate}>Save</button></td><td className="error" colSpan="2"><div dangerouslySetInnerHTML={{ __html: errorObj.errorMsg }} /></td></tr>
            </tbody>
        </table>
    );
};
