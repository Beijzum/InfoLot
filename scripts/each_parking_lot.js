function displayParkingInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    db.collection("parkingLots")        // doublecheck: is your collection called "Reviews" or "reviews"?
        .doc(ID)
        .get()
        .then(doc => {      // Assign variables to collection data
            thisLot = doc.data();
            parkingCode = thisLot.code;
            parkingLotName = doc.data().name;
            parkingLotDetails = doc.data().details;

            // Populate Title, image, and other details
            document.getElementById("parkingLotName").innerHTML = parkingLotName;
            let imgEvent = document.querySelector(".parking-img");
            imgEvent.src = "../lot_images/" + parkingCode + ".jpg";
            document.getElementById("details-go-here").innerHTML = `${thisLot.address}<br>${thisLot.hours_of_operation}<br><br>${parkingLotDetails}`;
        });
}

displayParkingInfo();


/* Saves the reviews onto local storage */
function writeReviewBtn() {
    let parkingLotID = (new URL(window.location.href)).searchParams.get("docID"); // Searches for the value of docID in the current windows URL

    if (parkingLotID) {
        localStorage.setItem('parkingLotDocID', parkingLotID);   // Save the parking lot ID to local storage
        window.location.href = `/review.html?docID=${parkingLotID}`; // Redirects to review.html with the parking lot ID as its docID
    }
}


// Add parking lot ID as favourites
function saveFavouriteParkingLot(userID, parkingLotId) {
    var userDocRef = db.collection("users").doc(userID);        // Get a reference to the user document in Firestore

    userDocRef.update({         // Update the user document with the parking lot ID with favourites as a variable
        favourites: firebase.firestore.FieldValue.arrayUnion(parkingLotId)
    })
        .then(function () {
            console.log('Added Parking Lot ID to user favorites.');
        })
        .catch(function (error) {
            console.error('Error updating user favorites:', error);
        });
}


function addFavouritesBtn() {
    var userId = firebase.auth().currentUser.uid;
    let params = new URL(window.location.href);         // Parse the parameters from the URL of current window
    var parkingLotId = params.searchParams.get("docID");    // Grabs docID from URL 

    if (parkingLotId) {
        saveFavouriteParkingLot(userId, parkingLotId);      // Call the function to save the favorite
    } else {
        console.error("Parking lot ID not found in the URL.");
    }
}
