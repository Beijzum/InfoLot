// Function to generate keys for selected spots
function selectedSpotsKey(spotClass) {
  return `selected${spotClass === "spotsA" ? "A" : "B"}Spots`;
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

  // Create a label element displaying the spot key (e.g., 'a1', 'a2' or 'b1', 'b2')
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
    }
  });

  // Append the icon and label elements to the spot element
  spotElement.appendChild(iconElement);
  spotElement.appendChild(labelElement);

  // Append the spot element to the parking spots container
  container.appendChild(spotElement);
}

// Create a function to render the parking spots and handle save button click
function renderParkingSpotsAndSave() {
  const spotsAContainer = document.getElementById("spotsA-container");
  const spotsBContainer = document.getElementById("spotsB-container");

  spotsAContainer.innerHTML = "";
  spotsBContainer.innerHTML = "";

  const parkingSpotData = db.collection("parkings").doc("irTl1dU7fok3OYsKSYcF");

  parkingSpotData.get().then((doc) => {
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
      saveButton.addEventListener("click", () => {
        const selectedSpotsA = data[selectedSpotsKey("spotsA")] || [];
        const selectedSpotsB = data[selectedSpotsKey("spotsB")] || [];

        const updateObject = {};

        selectedSpotsA.forEach((selectedKeyA) => {
          updateObject[`spotsA.${selectedKeyA}`] = false;
        });

        selectedSpotsB.forEach((selectedKeyB) => {
          updateObject[`spotsB.${selectedKeyB}`] = false;
        });

        db.collection("parkings")
          .doc("irTl1dU7fok3OYsKSYcF")
          .update(updateObject)
          .then(() => {
            data[selectedSpotsKey("spotsA")] = [];
            data[selectedSpotsKey("spotsB")] = [];

            setTimeout(() => {
              location.reload();
            }, 500);
          })
          .catch((error) => {
            console.error("Error updating database:", error);
          });
      });
    }
  });
}

// Initial rendering and save button click handling
renderParkingSpotsAndSave();
