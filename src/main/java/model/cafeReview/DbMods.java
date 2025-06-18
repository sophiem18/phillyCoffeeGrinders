package model.cafeReview;

import dbUtils.*;

public class DbMods {

    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        // Validate required fields
        errorMsgs.reviewTitle = Validate.stringMsg(inputData.reviewTitle, 45, true);
        errorMsgs.cafeName = Validate.stringMsg(inputData.cafeName, 45, true);
        errorMsgs.imageUrl = Validate.stringMsg(inputData.imageUrl, 500, true);

        // Optional fields
        errorMsgs.orderName = Validate.stringMsg(inputData.orderName, 65535, false); // text
        errorMsgs.priceOrder = Validate.decimalMsg(inputData.priceOrder, false);
        errorMsgs.ambianceScore = Validate.integerMsg(inputData.ambianceScore, false);
        errorMsgs.userComment = Validate.stringMsg(inputData.userComment, 65535, false); // text
        errorMsgs.userImage = Validate.stringMsg(inputData.userImage, 500, false);
        errorMsgs.userEmail = Validate.stringMsg(inputData.userEmail, 45, true); // Assuming FK required

        return errorMsgs;
    }

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = validate(inputData);
        if (errorMsgs.characterCount() > 0) {
            errorMsgs.errorMsg = "<span class='user-error'>Please correct the highlighted fields.</span>";
            return errorMsgs;
        }

        String sql = "INSERT INTO cafe_review (review_title, cafe_name, image_url, order_name, " +
                     "price_order, ambiance_score, user_comment, user_image, user_email) " +
                     "VALUES (?,?,?,?,?,?,?,?,?)";

        PrepStatement pStatement = new PrepStatement(dbc, sql);

        pStatement.setString(1, inputData.reviewTitle);
        pStatement.setString(2, inputData.cafeName);
        pStatement.setString(3, inputData.imageUrl);
        pStatement.setString(4, inputData.orderName);
        pStatement.setBigDecimal(5, Validate.convertDecimal(inputData.priceOrder));
        pStatement.setInt(6, Validate.convertInteger(inputData.ambianceScore));
        pStatement.setString(7, inputData.userComment);
        pStatement.setString(8, inputData.userImage);
        pStatement.setString(9, inputData.userEmail); // FK

        int numRows = pStatement.executeUpdate();
        errorMsgs.errorMsg = pStatement.getErrorMsg();

        if (errorMsgs.errorMsg.length() == 0) {
            if (numRows == 1) {
                errorMsgs.errorMsg = ""; // Success
            } else {
                errorMsgs.errorMsg = "<span class='user-error'>Unexpected insert behavior.</span><br>" +
                                     "<span class='tech-error'>" + numRows +
                                     " records were inserted when exactly 1 was expected.</span>";
            }
        } else if (errorMsgs.errorMsg.contains("foreign key")) {
            errorMsgs.errorMsg = "<span class='user-error'>Invalid User Email (foreign key).</span><br>" +
                                 "<span class='tech-error'>" + errorMsgs.errorMsg + "</span>";
        } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
            errorMsgs.errorMsg = "<span class='user-error'>That review title is already taken.</span><br>" +
                                 "<span class='tech-error'>" + errorMsgs.errorMsg + "</span>";
        } else {
            errorMsgs.errorMsg = "<span class='user-error'>An unexpected error occurred.</span><br>" +
                                 "<span class='tech-error'>" + errorMsgs.errorMsg + "</span>";
        }

        return errorMsgs;
    }
}
