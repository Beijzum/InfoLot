var parkingLotDocID = localStorage.getItem("parkingLotDocID"); //visible to all functions on this page

function displayParkingName() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log(ID);

  db.collection("parkingLots") // This looks at parkingLots database to pull parking lot name
    .doc(ID)
    .get()
    .then((doc) => {
      // Assign variables to collection data
      thisLot = doc.data();
      parkingCode = thisLot.code;
      parkingLotName = doc.data().name;

      // Populate Title, image, and other details
      document.getElementById("parkingLotName").innerHTML = parkingLotName;
    });
}

displayParkingName();

async function provideReserveDetails(userID, parkingLotDocID) {
  console.log("inside fill out reserve details");
  let dateSelect = document.getElementById("dateInput").value;
  let reserveStartTime = document.getElementById("startTime").value;
  let duration = document.getElementById("endTime").value;

  console.log(dateSelect, reserveStartTime, duration);

  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;
    var docRef;

    // Calculate the expiration time based on the selected start time and duration
    const startTime = new Date(`${dateSelect}T${reserveStartTime}:00`);
    const endTime = new Date(`${dateSelect}T${duration}:00`);

    // Calculate duration in milliseconds
    const durationInMilliseconds = endTime - startTime;

    // Convert duration to hours and minutes
    const durationInHours = Math.floor(
      durationInMilliseconds / (60 * 60 * 1000)
    );
    const durationInMinutes = Math.floor(
      (durationInMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
    );

    // Use server timestamp for accurate time calculation
    const serverTimestamp =
      await firebase.firestore.FieldValue.serverTimestamp();

    // Format the duration as "hh:mm"
    const formattedDuration = `${durationInHours}:${durationInMinutes
      .toString()
      .padStart(2, "0")}`;

    // Retrieve reserve_details for the current user.
    db.collection("reserve_details")
      .add({
        parkingLotDocID: parkingLotDocID,
        userID: userID,
        date: dateSelect,
        start: reserveStartTime,
        endTime: duration, // Use the selected end time as is
        duration: formattedDuration,
        timestamp: serverTimestamp,
      })
      .then((addedDocRef) => {
        docRef = addedDocRef;
        // Update the user collection with the reservation details
        return currentUser.update({
          reservations: firebase.firestore.FieldValue.arrayUnion(
            addedDocRef.id
          ),
          history: firebase.firestore.FieldValue.arrayUnion(parkingLotDocID),
        });
      })
      .then(() => {
        // Redirect to thanks for reservation page
        window.location.href = `thanks_reserve.html?docRef=${docRef.id}`;
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  } else {
    console.log("No user is signed in");
    window.location.href = "reserve.html";
  }
}

function checkExpiredReservations(parkingLotDocID, reservationDocumentId) {
  // Check for expired reservations and update spot availability
  db.collection("parkings")
    .doc(parkingLotDocID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        return checkExpiredReservationsForSpotClass(
          "spotsA",
          reservationDocumentId,
          data
        );
      } else {
        console.error("Parking lot document not found");
      }
    })
    .catch((error) => {
      console.error("Error checking expired reservations:", error);
    });
}

function submitReserve() {
  var userId = firebase.auth().currentUser.uid;
  let params = new URL(window.location.href); // Parse the parameters from the URL of current window
  var parkingLotId = params.searchParams.get("docID"); // Grabs docID from URL

  if (parkingLotId) {
    provideReserveDetails(userId, parkingLotId); // Call the function to reserve details
  } else {
    console.error("Parking lot ID not found in the URL.");
  }
}

// Helper function to parse duration in "hh:mm" format and return the total minutes
function parseDuration(duration) {
  const [hours, minutes] = duration.split(":").map(Number);
  return hours * 60 + minutes;
}

// Helper function to format time as "hh:mm"
function formatTime(time) {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
