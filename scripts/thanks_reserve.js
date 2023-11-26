// Retrieve URL parameter
const urlParams = new URLSearchParams(window.location.search);
const docRefID = urlParams.get("docRef");

// Get reservation details
const reserveDetailsCollection = db.collection("reserve_details");
const docRef = reserveDetailsCollection.doc(docRefID);

docRef.get().then((doc) => {
  if (doc.exists) {
    const reserveDetails = doc.data();

    // Convert start and end times to Date objects
    const startTime = new Date(`1970-01-01T${reserveDetails.start}`);
    let endTime = new Date(`1970-01-01T${reserveDetails.endTime}`);

    // Adjust end time date if it's before the start time
    if (endTime < startTime) {
      endTime = new Date(endTime.getTime() + 24 * 60 * 60 * 1000); // Add one day
    }

    // Calculate time difference in milliseconds
    let timeDiff = endTime - startTime;

    // Convert time difference to hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    // Format minutes to always display two digits
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Create a human-readable duration string
    const durationString = `${hours} hours ${minutes} minutes`;

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
          ).innerHTML = `<p>${parkingLotName}</p>`;
          document.getElementById(
            "date"
          ).innerHTML = `<p>${reserveDetails.date}</p>`;
          document.getElementById(
            "startTime"
          ).innerHTML = `<p>${reserveDetails.start}</p>`;
          document.getElementById(
            "endTime"
          ).innerHTML = `<p>${reserveDetails.endTime}</p>`;
          document.getElementById(
            "duration"
          ).innerHTML = `<p>${durationString}</p>`;
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
