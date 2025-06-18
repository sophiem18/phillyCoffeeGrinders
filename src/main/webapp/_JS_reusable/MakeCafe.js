"use strict";

function MakeCafe({
    cafeName = "Unknown Cafe",
    cafeImgURL = "docs/pics/default.jpg",
    imgObjList = [],
    cafeNeighborhood = "Unknown Location",
    cafeDescription = "No description available.",
    avgPrice = 0.00
}) {
    // State object to track changing properties
    const state = {
        cafeName,
        cafeImgURL,
        cafeNeighborhood,
        cafeDescription,
        avgPrice
    };

    // Container div
    const cafeDiv = document.createElement("div");
    cafeDiv.classList = "cafe";

    // Create elements
    const nameEle = document.createElement("h2");
    nameEle.className = "cafeName";

    let neighborhoodEle = document.createElement("h3");
    neighborhoodEle.className = "cafeNeighborhood";

    const imgEle = document.createElement("img");

    const selectEle = document.createElement("select");

    const descEle = document.createElement("p");
    descEle.className = "cafeDescription";

    const priceEle = document.createElement("p");
    priceEle.className = "avgPrice";

    const priceButton = document.createElement("button");
    priceButton.textContent = "Increase Avg Price";
    priceButton.className = "priceButton";

    // Private display function to update UI
    function display() {
        nameEle.textContent = state.cafeName;
        neighborhoodEle.textContent = `Neighborhood: ${state.cafeNeighborhood}`;
        imgEle.src = state.cafeImgURL;
        imgEle.alt = `Image of ${state.cafeName}`;
        descEle.textContent = state.cafeDescription;
        priceEle.textContent = `Average Price: $${state.avgPrice.toFixed(2)}`;
    }

    // <select>
    if (imgObjList.length > 0) {
        imgObjList.forEach(imgObj => {
            const optionEle = document.createElement("option");
            optionEle.value = imgObj.val;
            optionEle.textContent = imgObj.display;
            if (imgObj.val === state.cafeImgURL) {
                optionEle.selected = true;
            }
            selectEle.appendChild(optionEle);
        });

        // Update image when user selects a new option
        selectEle.addEventListener("change", (event) => {
            state.cafeImgURL = event.target.value;
            display();
        });

        cafeDiv.appendChild(selectEle);
    }

    // Modify avgPrice when button is clicked (non-character property)
    priceButton.addEventListener("click", () => {
        state.avgPrice += 1.00; // Increase by $1.50 dynamically
        display();
    });

    // Modify cafeNeighborhood on mouseover (other property)
    const neighborhoods = ["Fishtown", "Center City", "Old City", "University City", "South Philly", "West Philly", "Northern Liberties", "Rittenhouse", "North Philly"];
    let neighborhoodIndex = 0;

    neighborhoodEle.addEventListener("click", () => {
        neighborhoodIndex = (neighborhoodIndex + 1) % neighborhoods.length;
        state.cafeNeighborhood = neighborhoods[neighborhoodIndex];
        display();
    });

    // Append elements to the container
    cafeDiv.appendChild(nameEle);
    cafeDiv.appendChild(neighborhoodEle);
    cafeDiv.appendChild(imgEle);
    cafeDiv.appendChild(descEle);
    cafeDiv.appendChild(priceEle);
    cafeDiv.appendChild(priceButton);

    // Initial render
    display();

    return cafeDiv;
}  