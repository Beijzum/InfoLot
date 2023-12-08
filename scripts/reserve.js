//https://bcit-cst.notion.site/Tech-Tip-B02-How-can-we-link-parking-spot-buttons-to-the-database-for-toggling-availability-and-en-988b5cb4883245d2828a4509dcacdd7a

// Create a function to render the parking spots and handle save button click
function renderParkingSpotsAndSave() {
    // Get the container element where parking spots will be displayed
    let parkingLotID = new URL(window.location.href).searchParams.get("docID");

    const parkingSpotsContainer = document.getElementById("parking-spots");

    // Clear existing content within the container
    parkingSpotsContainer.innerHTML = ""; // Clear existing content

    // Fetch parking spot data from Firestore using a specific document ID
    const parkingSpotData = db.collection("parkingLots").doc(parkingLotID);

    // Retrieve data from the Firestore document
    parkingSpotData.get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();

            // Sort keys (e.g., 'A1', 'A2') for consistent display order
            const keys = Object.keys(data.spots).sort();

            // Loop through each parking spot key
            keys.forEach((key) => {
                const spot = data.spots[key];

                // Create a new HTML element for the parking spot
                const spotElement = document.createElement("div");
                spotElement.classList.add("spot");

                // Create an HTML element for the icon
                const iconElement = document.createElement("span");
                iconElement.classList.add("material-icons");

                // Determine the icon and styling based on spot availability
                if (spot === true) {
                    if (data.selected === key) {
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

                // Create a label element displaying the spot key (e.g., 'a1', 'a2')
                const labelElement = document.createElement("span");
                labelElement.textContent = key;

                // Add a click event to toggle spot selection
                spotElement.addEventListener("click", () => {
                    if (spot === true) {
                        if (data.selected === key) {
                            // Unselect the item if it was previously selected
                            data.selected = null;
                            iconElement.textContent = "check_box_outline_blank";
                            iconElement.classList.remove("selectedSpot");
                            iconElement.classList.add("availableSpot");
                        } else {
                            // Select the item if it was not previously selected
                            data.selected = key;
                            iconElement.textContent = "check_box";
                            iconElement.classList.remove("availableSpot");
                            iconElement.classList.add("selectedSpot");
                        }
                    }
                });

                // Append the icon and label elements to the spot element
                spotElement.appendChild(iconElement);
                spotElement.appendChild(labelElement);

                // Append the spot element to the parking spots container
                parkingSpotsContainer.appendChild(spotElement);
            });

            // Attach a click event listener to the 'Save' button
            const saveButton = document.getElementById("save-button");
            saveButton.addEventListener("click", () => {
                const selectedKey = data.selected; // Get the selected key
                if (selectedKey !== null && selectedKey !== undefined) {
                    // Get user confirmation
                    const isConfirmed = window.confirm(
                        "Are you sure you want to reserve this spot?"
                    );
                    // Check if the user confirmed
                    if (isConfirmed) {
                        // Update the selected key to 'false' in the database
                        db.collection("parkingLots")
                            .doc(parkingLotID)
                            .update({
                                [`spots.${selectedKey}`]: false,
                            })
                            .then(() => {
                                // Adds spot to temp_spots
                                return db.collection("temp_spots").add({
                                    parkingLotDocID: parkingLotID,
                                    spots: {
                                        [selectedKey]: false,
                                    },
                                });
                            })
                            .then((tempSpotRef) => {
                                // Redirects to reserve_details page with spot info
                                console.log(tempSpotRef.id);
                                redirectReserveDetails(tempSpotRef.id);
                            })
                            .catch((error) => {
                                console.error(
                                    "Error updating database:",
                                    error
                                );
                            });
                    }
                }
            });
        }
    });
}

// Initial rendering and save button click handling
renderParkingSpotsAndSave();

function redirectReserveDetails(tempSpotID) {
    let spotID = tempSpotID;
    let parkingLotID = new URL(window.location.href).searchParams.get("docID");
    window.location.href = `/reserve_details.html?docID=${parkingLotID}&spotID=${spotID}`;
}
