function displayParkingInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("parkingLots")
        .doc(ID)
        .get()
        .then(doc => {
            thisLot = doc.data();
            parkingCode = thisLot.code;
            parkingLotName = doc.data().name;
            parkingLotDetails = doc.data().details;

            // only populate title, and image
            document.getElementById("parkingLotName").innerHTML = parkingLotName;
            let imgEvent = document.querySelector(".parking-img");
            imgEvent.src = "../lot_images/" + parkingCode + ".jpg";
            document.getElementById("details-go-here").innerHTML = `${thisLot.address}<br>${thisLot.hours_of_operation}<br><br>${parkingLotDetails}`;
        });
}
displayParkingInfo();

/* Saves the reviews onto local storage */
function saveParkingLotDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('parkingLotDocID', ID);
    window.location.href = 'review.html';
}


// Add parking lot ID as favourites
function saveFavoriteParkingLot(userID, parkingLotId) {
    // Get a reference to the user document in Firestore
    var userDocRef = db.collection("users").doc(userID);

    // Update the user document with the parking lot ID with favourites as a variable
    userDocRef.update({
        favourites: firebase.firestore.FieldValue.arrayUnion(parkingLotId)
    })
        .then(function () {
            console.log('Added Parking Lot ID to user favorites.');
        })
        .catch(function (error) {
            console.error('Error updating user favorites:', error);
        });
}


function onAddToFavoritesButtonClick() {
    var userId = firebase.auth().currentUser.uid;
    var parkingLotId = "your_parking_lot_id"; 

    saveFavoriteParkingLot(userId, parkingLotId);
}