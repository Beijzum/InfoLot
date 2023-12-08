// https://bcit-cst.notion.site/1800-Tech-Tips-202330-375ca5b360eb49eeb78be913730ade84
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
            document.getElementById("parkingLotName").innerHTML =
                parkingLotName;
        });
}

displayParkingName();

// Function to update duration when end time changes
function updateDuration() {
    let dateSelect = document.getElementById("dateInput").value;
    let reserveStartTime = document.getElementById("startTime").value;
    let reserveEndTime = document.getElementById("endTime").value;

    // Parse time strings to Date objects
    // https://stackoverflow.com/questions/56663604/how-to-convert-string-to-date-object-in-javascript
    const startTime = new Date(`${dateSelect}T${reserveStartTime}:00Z`);
    const endTime = new Date(`${dateSelect}T${reserveEndTime}:00Z`);

    // Check if either start time or end time is not a valid date
    if (isNaN(startTime) || isNaN(endTime)) {
        // Clear the duration if either time is not valid
        document.getElementById("duration").textContent = "";
        return;
    }

    // If endTime is before startTime, adjust date to the next day
    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    // Calculate duration in minutes
    let durationInMinutes = (endTime - startTime) / (1000 * 60);

    // If duration is negative, adjust it
    if (durationInMinutes < 0) {
        durationInMinutes += 24 * 60; // Add 24 hours in minutes to keep duration all in minutes
    }
    

    // Convert duration to hours and minutes
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);

    // Display duration in HTML
    let durationText;

    if (hours > 0) {
        // If hours is 1, then 1 hour, else hours. Same for minutes. If minute = 1, then minute, else minutes
        durationText = `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${
            minutes === 1 ? "minute" : "minutes"
        }`;
    } else {
        // If minutes is equal to 1, then minute, else minutes)
        durationText = `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }

    document.getElementById("duration").textContent = `${durationText}`;

    console.log(dateSelect, reserveStartTime, durationText);
}

// Event listener for the "change" event on the "endTime" input field
document.getElementById("startTime").addEventListener("change", updateDuration);
document.getElementById("endTime").addEventListener("change", updateDuration);

async function provideReserveDetails(userID, parkingLotDocID) {
    console.log("inside fill out reserve details");
    let spotRefDocID = new URL(window.location.href).searchParams.get("spotID");
    let dateSelect = document.getElementById("dateInput").value;
    let reserveStartTime = document.getElementById("startTime").value;
    let reserveEndTime = document.getElementById("endTime").value;

    // Parse time strings to Date objects for easy manipulation
    const startTime = new Date(`${dateSelect}T${reserveStartTime}:00Z`);
    let endTime = new Date(`${dateSelect}T${reserveEndTime}:00Z`);

    // If endTime is before startTime, adjust date to the next day
    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    // Calculate duration in minutes
    let duration = (endTime - startTime) / (1000 * 60);

    // If duration is negative, adjust it
    if (duration < 0) {
        duration += 24 * 60; // Add 24 hours in minutes to keep duration all in minutes
    }

    // Convert duration back to hours and minutes
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);

    // Display duration in the HTML span element
    document.getElementById("duration").textContent = `${hours}:${
        minutes < 10 ? "0" : ""
    }${minutes}`;

    console.log(
        dateSelect,
        reserveStartTime,
        hours + ":" + (minutes < 10 ? "0" : "") + minutes
    );

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        var docRef;
        var spotDocID = spotRefDocID;
        // Use server timestamp for accurate time calculation
        const serverTimestamp =
            await firebase.firestore.FieldValue.serverTimestamp();

        // Retrieve reserve_details for the current user.
        db.collection("reserve_details")
            .add({
                parkingLotDocID: parkingLotDocID,
                userID: userID,
                date: dateSelect,
                start: reserveStartTime,
                endTime: reserveEndTime, // Use the selected end time as is
                duration: duration,
                timestamp: serverTimestamp,
                spotID: spotDocID,
            })
            .then((addedDocRef) => {
                docRef = addedDocRef;
                // Update the user collection with the reservation details
                return currentUser.update({
                    reservations: firebase.firestore.FieldValue.arrayUnion(
                        addedDocRef.id
                    ),
                    history:
                        firebase.firestore.FieldValue.arrayUnion(
                            parkingLotDocID
                        ),
                });
            })
            .then(() => {
                // Redirect to reserve confirmation page
                window.location.href = `thanks_reserve.html?docRef=${docRef.id}&spotID=${spotRefDocID}`;
            })
            .catch((error) => {
                console.error("Error updating database:", error);
            });
    } else {
        console.log("No user is signed in");
        window.location.href = "reserve.html";
    }
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
