// Retrieve URL parameter
const urlParams = new URLSearchParams(window.location.search);
const docRefID = urlParams.get("docRef");

// Get reservation details
const reserveDetailsCollection = db.collection("reserve_details");
const docRef = reserveDetailsCollection.doc(docRefID);

docRef.get().then((doc) => {
  if (doc.exists) {
    const reserveDetails = doc.data();

    // Retrieve parking lot name based on parkingLotDocID
    const parkingLotDocID = reserveDetails.parkingLotDocID;

    db.collection("parkingLots")
      .doc(parkingLotDocID)
      .get()
      .then((parkingLotDoc) => {
        if (parkingLotDoc.exists) {
          const parkingLotName = parkingLotDoc.data().name;

          // Update the HTML elements with reservation details
          document.getElementById(
            "parkingLotName"
          ).innerHTML += `<p>${parkingLotName}</p>`;
          document.getElementById(
            "date"
          ).innerHTML += `<p>${reserveDetails.date}</p>`;
          document.getElementById(
            "startTime"
          ).innerHTML += `<p>${reserveDetails.start}</p>`;
          document.getElementById(
            "duration"
          ).innerHTML += `<p>${reserveDetails.duration}</p>`;
        } else {
          console.error("Parking lot not found");
          // Handle appropriately based on your application logic
        }
      })
      .catch((error) => {
        console.error("Error getting parking lot:", error);
        // Handle appropriately based on your application logic
      });
  } else {
    console.error("No matching reservation found");
    // Handle appropriately based on your application logic
  }
});
