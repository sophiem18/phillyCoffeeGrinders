package model.cafeReview;

import java.util.ArrayList;

public class StringDataList {
    public String dbError = "";
    public ArrayList <StringData> cafeReviewList = new ArrayList <StringData>();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public StringDataList() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(StringData stringData) {
        this.cafeReviewList.add(stringData);
    }
}
