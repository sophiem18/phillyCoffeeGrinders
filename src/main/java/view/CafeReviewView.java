package view; 

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.cafeReview.*;
import dbUtils.*;

public class CafeReviewView {
    
    public static StringDataList getAllReviews(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT reviews_id, review_title, cafe_name, image_url, order_name, price_order, ambiance_score, user_comments, "
                    + "web_user.user_image, web_user.user_email "
                    + "FROM reviews, web_user WHERE reviews.web_user_id = web_user.web_user_id "
                    + "ORDER BY reviews_id";  // always order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the Format methods do not throw exceptions. If they find illegal data (like you 
                // tried to format a date as an integer), they return an error message (instead of 
                // returning the formatted value). So, you'll see these error messages right in the 
                // API output (JSON data) and/or you'll see it on the page in the UI.
                sd.reviewsID = Format.fmtInteger(results.getObject("reviews_id"));
                sd.reviewTitle = Format.fmtString(results.getObject("reviews.review_title"));
                sd.cafeName = Format.fmtString(results.getObject("reviews.cafe_name"));
                sd.imageUrl = Format.fmtString(results.getObject("reviews.image_url"));
                sd.orderName = Format.fmtString(results.getObject("reviews.order_name"));
                sd.priceOrder = Format.fmtDollar(results.getObject("reviews.price_order"));
                sd.ambianceScore = Format.fmtInteger(results.getObject("reviews.ambiance_score"));
                sd.userComment = Format.fmtString(results.getObject("reviews.user_comments"));
                sd.userImage = Format.fmtString(results.getObject("web_user.user_image"));
                sd.userEmail = Format.fmtString(results.getObject("web_user.user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in CafeReviewView.getAllReviews(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}