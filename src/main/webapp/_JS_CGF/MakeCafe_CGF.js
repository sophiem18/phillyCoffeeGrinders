"use strict";

function MakeCafe_CGF() {
    //container
    const container = document.createElement("div");
    //list of pic options 

    const laColombeImg = [
        {display: "Exterior", val: "docs/pics/lc-outside.jpg"},
        {display: "Interior", val: "docs/pics/lc-inside.webp"},
        {display: "Drink", val: "docs/pics/lc-drink.jpg"}
    ]
    const theGroundImg = [
        {display: "Exterior", val: "docs/pics/the-ground-outside.jpg"},
        {display: "Interior", val: "docs/pics/the-ground-inside.jpg"},
        {display: "Drink", val: "docs/pics/the-ground-drink.jpg"}
    ]
    //cafe that is filled out
    const cafe1 = MakeCafe({
        cafeName: "La Colombe",
        cafeImgURL: "docs/pics/lc-outside.jpg",
        imgObjList: laColombeImg,
        cafeNeighborhood: "Fishtown",
        cafeDescription: "In Philly and need a coffee break? Stop by and enjoy a delicious coffee at our La Colombe Fishtown Cafe. We have a variety of drinks to choose from!",
        avgPrice: 5.00
    });

    const cafe2 = MakeCafe({
        cafeName: "The Ground Rittenhouse",
        cafeImgURL: "docs/pics/the-ground-inside.jpg",
        imgObjList: theGroundImg,
        cafeNeighborhood: "Rittenhouse",
        cafeDescription: "The Ground is a coffee shop and cafe located in Rittenhouse Square, Philadelphia. We serve specialty coffee, breakfast, lunch, and pastries.",
        avgPrice: 7.50
    });

    //cafe that is not filled out
    const cafe3 = MakeCafe({});

    container.appendChild(cafe1);
    container.appendChild(cafe2);
    container.appendChild(cafe3);

    console.log("MakeCafe_CGF is running");

    return container;
}