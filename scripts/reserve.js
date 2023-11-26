var parkingLotDocID = localStorage.getItem("parkingLotDocID");

// Function to generate keys for selected spots
function selectedSpotsKey(spotClass) {
    return `selected${spotClass === "spotsA" ? "A" : "B"}Spots`;
}

// Function to set selected spots in localStorage
function setSelectedSpotsLocalStorage(spotClass, selectedSpots) {
    localStorage.setItem(
        selectedSpotsKey(spotClass),
        JSON.stringify(selectedSpots)
    );
}

// Function to remove event listeners from all spot elements
function removeEventListeners() {
    const allSpotElements = document.querySelectorAll(".spotsA, .spotsB");
    allSpotElements.forEach((spotElement) => {
        spotElement.removeEventListener("click", handleSpotClick);
    });
}

// Function to render a parking spot
function renderSpot(container, spotClass, spotKey, spotAvailability, data) {
    // Create a new HTML element for the parking spot
    const spotElement = document.createElement("div");
    spotElement.classList.add(spotClass);

    // Create an HTML element for the icon
    const iconElement = document.createElement("span");
    iconElement.classList.add("material-icons");

    // Initialize selectedSpots array if it doesn't exist
    data[selectedSpotsKey(spotClass)] = data[selectedSpotsKey(spotClass)] || [];

    // Determine the icon and styling based on spot availability
    if (spotAvailability === true) {
        const selectedSpots = data[selectedSpotsKey(spotClass)];
        if (selectedSpots && selectedSpots.includes(spotKey)) {
            // If spot is available and selected, show a checked box
            iconElement.textContent = "check_box";
            iconElement.classList.add("selectedSpot");
        } else {
            // If spot is available but not selected, show an unchecked box
            iconElement.textContent = "check_box_outline_blank";
            iconElement.classList.add("availableSpot");
        }
    } else {
        // If spot is not available, show an indeterminate checked box
        iconElement.textContent = "indeterminate_check_box";
        iconElement.classList.add("takenSpot");
    }

    // Create a label element displaying the spot key (e.g., 'A1', 'A2' or 'B1', 'B2', etc.)
    const labelElement = document.createElement("span");
    labelElement.textContent = spotKey;

    // Add a click event to toggle spot selection
    spotElement.addEventListener("click", () => {
        if (spotAvailability === true) {
            const selectedSpots = data[selectedSpotsKey(spotClass)];
            if (selectedSpots.includes(spotKey)) {
                // Unselect the item if it was previously selected
                selectedSpots.splice(selectedSpots.indexOf(spotKey), 1);
                iconElement.textContent = "check_box_outline_blank";
                iconElement.classList.remove("selectedSpot");
                iconElement.classList.add("availableSpot");
            } else {
                // Select the item if it was not previously selected
                selectedSpots.push(spotKey);
                iconElement.textContent = "check_box";
                iconElement.classList.remove("availableSpot");
                iconElement.classList.add("selectedSpot");
            }
            setSelectedSpotsLocalStorage(spotClass, selectedSpots); // Set selected spots in localStorage
        }
    });

    // Append the icon and label elements to the spot element
    spotElement.appendChild(iconElement);
    spotElement.appendChild(labelElement);

    // Append the spot element to the parking spots container
    container.appendChild(spotElement);
}

// Function to create a delay
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to check for expired reservations and update spot availability
async function checkExpiredReservations(data) {
    // Check spotsA
    await checkExpiredReservationsForSpotClass(
        "spotsA",
        reservationDocumentId,
        data
    );

    // Check spotsB
    await checkExpiredReservationsForSpotClass(
        "spotsB",
        reservationDocumentId,
        data
    );
}

setInterval(async () => {
    const parkingSpotData = db
        .collection("parkings")
        .doc("irTl1dU7fok3OYsKSYcF");
    const doc = await parkingSpotData.get();

    if (doc.exists) {
        const data = doc.data();
        await checkExpiredReservations(data);
    }
}, 1000); // 1 second in milliseconds

// Function to render the parking spots and handle save button click
async function renderParkingSpotsAndSave() {
    const spotsAContainer = document.getElementById("spotsA-container");
    const spotsBContainer = document.getElementById("spotsB-container");

    spotsAContainer.innerHTML = "";
    spotsBContainer.innerHTML = "";

    const parkingSpotData = db
        .collection("parkings")
        .doc("irTl1dU7fok3OYsKSYcF");

    try {
        const doc = await parkingSpotData.get();

        if (doc.exists) {
            const data = doc.data();

            const spotsAkeys = Object.keys(data.spotsA).sort();
            const spotsBkeys = Object.keys(data.spotsB).sort();

            removeEventListeners();

            spotsAkeys.forEach((keyA) => {
                const spotsA = data.spotsA[keyA];
                renderSpot(spotsAContainer, "spotsA", keyA, spotsA, data);
            });

            spotsBkeys.forEach((keyB) => {
                const spotsB = data.spotsB[keyB];
                renderSpot(spotsBContainer, "spotsB", keyB, spotsB, data);
            });

            const saveButton = document.getElementById("save-button");
            saveButton.addEventListener("click", async () => {
                const selectedSpotsA = data[selectedSpotsKey("spotsA")] || [];
                const selectedSpotsB = data[selectedSpotsKey("spotsB")] || [];

                const updateObject = {};

                selectedSpotsA.forEach((selectedKeyA) => {
                    updateObject[`spotsA.${selectedKeyA}`] = false;
                });

                selectedSpotsB.forEach((selectedKeyB) => {
                    updateObject[`spotsB.${selectedKeyB}`] = false;
                });

                await db
                    .collection("parkings")
                    .doc("irTl1dU7fok3OYsKSYcF")
                    .update(updateObject);

                data[selectedSpotsKey("spotsA")] = [];
                data[selectedSpotsKey("spotsB")] = [];

                // Add a delay before reloading the page
                await delay(500);

                // Reload the page to reflect the latest updates from the database
                location.reload();
            });

            // Check for expired reservations and update spot availability
            await checkExpiredReservations(data);
        }
    } catch (error) {
        console.error("Error fetching data from the database:", error);
    }
}

async function checkExpiredReservationsForSpotClass(
    spotClass,
    reservationDocumentId,
    data
) {
    const currentTimestamp = new Date();
    const selectedSpots = data[selectedSpotsKey(spotClass)] || [];
    const spotKeys = Object.keys(data[spotClass]).sort();

    for (const spotKey of spotKeys) {
        const reservationExpirationTime =
            data[spotClass][spotKey].expirationTime;

        if (reservationExpirationTime) {
            const expirationTimestamp = new Date(reservationExpirationTime);

            console.log(
                `Spot: ${spotClass}-${spotKey}, Expiration: ${expirationTimestamp}, Current: ${currentTimestamp}`
            );

            if (expirationTimestamp <= currentTimestamp) {
                // Reservation has expired, remove the reservation from the database
                try {
                    await db
                        .collection("parkings")
                        .doc("irTl1dU7fok3OYsKSYcF")
                        .update({
                            [`${spotClass}.${spotKey}`]: true,
                        });

                    // Remove the reservation document from the reserve_details collection
                    const reservationDocument = await db
                        .collection("reserve_details")
                        .doc(reservationDocumentId)
                        .get();

                    if (reservationDocument.exists) {
                        await reservationDocument.ref.delete();
                        console.log(
                            "Reservation document deleted successfully."
                        );
                    } else {
                        console.log("Reservation document not found.");
                    }

                    // Render the spot after the database update
                    renderSpot(
                        document.getElementById(`${spotClass}-container`),
                        spotClass,
                        spotKey,
                        true,
                        data
                    );
                } catch (error) {
                    console.error(
                        "Error updating spot availability or removing reservation from the database:",
                        error
                    );
                }
            }
        }
    }
}

// Function to show or hide the next button based on spot selection
function toggleNextButtonVisibility() {
    const nextButton = document.getElementById("next-button");
    const selectedSpotsA =
        JSON.parse(localStorage.getItem(selectedSpotsKey("spotsA"))) || [];
    const selectedSpotsB =
        JSON.parse(localStorage.getItem(selectedSpotsKey("spotsB"))) || [];

    if (selectedSpotsA.length > 0 || selectedSpotsB.length > 0) {
        nextButton.style.display = "inline";
    } else {
        nextButton.style.display = "none";
    }
}

// Event listener for the next button click
let parkingLotID = new URL(window.location.href).searchParams.get("docID");
document.getElementById("next-button").addEventListener("click", () => {
    window.location.href = `/reserve_details.html?docID=${parkingLotID}`;
});

// Initial rendering and save button click handling
renderParkingSpotsAndSave();

// Check spot selection on page load
toggleNextButtonVisibility();

// Check spot selection whenever the page gains focus
window.addEventListener("focus", () => {
    toggleNextButtonVisibility();
});
