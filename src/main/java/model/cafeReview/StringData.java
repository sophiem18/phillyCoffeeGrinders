package model.cafeReview;

public class StringData {
    public String reviewsID = ""; // auto-increment primary key
    public String reviewTitle = "";     // varChar 45, must be unique
    public String cafeName = "";     // varChar 45, NOT NULL
    public String imageUrl = "";  // varChar 500, NOT NULL
    public String orderName = "";     // text, OPTIONAL and unique
    public String priceOrder = "";      // type decimal 8,2 optional
    public String ambianceScore = ""; // type integer (5), optional
    public String userComment = "";    // text optional
    public String userImage = "";  // varChar 500 , optional 
    public String userEmail = "";  // varChar 45

    public String errorMsg = "";      // not actually in the database, used by the app 
                                      // to convey success or failure.  
    
    public StringData() {
    }

    public int characterCount() {
        String s = this.reviewsID + this.reviewTitle + this.cafeName + this.imageUrl +
                   this.orderName + this.priceOrder + this.ambianceScore +
                   this.userComment + this.userImage + this.userEmail;
        return s.length();
    }

    @Override
    public String toString() {
        return "Review ID: " + this.reviewsID
                + ", Review Title: " + this.reviewTitle
                + ", Cafe Name: " + this.cafeName
                + ", Image URL: " + this.imageUrl
                + ", Order Name: " + this.orderName
                + ", Price Order: " + this.priceOrder
                + ", Ambiance Score: " + this.ambianceScore
                + ", User Comment: " + this.userComment
                + ", User Image: " + this.userImage
                + ", User Email: " + this.userEmail;
    }
}
