function doAll() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            getReservation(user);
        } else {
            console.log("No user is signed in");
        }
    });
}

doAll();

function getReservation(user) {
    db.collection("users")
        .doc(user.uid)
        .get()
        .then((userDoc) => {
            // Get the array of reservations
            let reservation = userDoc.data().reservations;
            console.log(reservation);

            // Get pointer the new card template
            let newcardTemplate = document.getElementById("savedCardTemplate");

            // Iterate through the ARRAY of reservations (document ID's)
            reservation.forEach((reservationID) => {
                db.collection("reserve_details")
                    .doc(reservationID)
                    .get()
                    .then((reservationDoc) => {
                        if (reservationDoc) {
                            let parkingLotID =
                                reservationDoc.data().parkingLotDocID;
                            let date = reservationDoc.data().date;
                            let duration = reservationDoc.data().duration;
                            let start = reservationDoc.data().start;
                            let end = reservationDoc.data().endTime;
                            let spotsDocID = reservationDoc.data().spotID;
                            const hours = Math.floor(duration / 60);
                            const minutes = Math.floor(duration % 60);
                            // Formatted time
                            let durationActual = `${hours}:${
                                minutes < 10 ? "0" : ""
                            }${minutes}`;
                            console.log(parkingLotID);
                            db.collection("parkingLots")
                                .doc(parkingLotID)
                                .get()
                                .then((doc) => {
                                    var title = doc.data().name; // get value of the "name" key
                                    var details = doc.data().details; // get value of the "details" key
                                    var parkingCode = doc.data().code; //get unique ID to each parking lot to be used for fetching right image
                                    var parkingAddress = doc.data().address;
                                    var parkingHours =
                                        doc.data().hours_of_operation;
                                    var parkingRate = doc.data().rate;
                                    var docID = doc.id;

                                    let newcard =
                                        newcardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                                    //update title and text and image
                                    newcard.querySelector(
                                        ".card-title"
                                    ).innerHTML = title;
                                    newcard.querySelector(
                                        ".card-text"
                                    ).innerHTML = `Reservation Date: ${date} <br> Start: ${start} <br> End: ${end} <br> Duration: ${durationActual} `;
                                    newcard.querySelector(
                                        ".card-image"
                                    ).src = `./lot_images/${parkingCode}.jpg`; //Example: NV01.jpg
                                    newcard.querySelector("a").href =
                                        "each_parking_lot.html?docID=" + docID;
                                    // Cancel Button
                                    newcard
                                        .querySelector(".style_button_cancel")
                                        .addEventListener("click", () => {
                                            // Passes reserve detail ID and spotID into cancel reservation function
                                            cancelReservation(
                                                reservationID,
                                                spotsDocID
                                            );
                                        });
                                    //attach to gallery, Example: "parking-lot-go-here"
                                    parkingLotsCardGroup.appendChild(newcard);
                                });
                        }
                    });
            });
        });
}

function cancelReservation(reservationID, spotsDocID) {
    firebase.auth().onAuthStateChanged((user) => {
        // Warns user about cancelling reservation
        var result = confirm(
            "WARNING " +
                user.displayName +
                ": Are you sure you want to cancel your reservation? Click OK to confirm cancellation."
        ); // Double check! Usability Heuristics #5
        if (result) {
            // If confirmed, then go ahead
            // Call findSpot function and handle the promise resolution
            findSpot(reservationID).then((spotInfo) => {
                // Check if spotInfo is null before accessing its properties
                if (spotInfo) {
                    // Update parking lot spot first
                    updateParkingSpot(spotInfo.parkingLotDocID, spotInfo.spots)
                        .then(() => {
                            console.log(
                                `Parking lot spot ${spotInfo.spots} updated to true`
                            );
                            // Now proceed with updating reservations in the user collection
                            const userDocRef = db
                                .collection("users")
                                .doc(user.uid);
                            // Calls the update reservations function to update user collection
                            updateReservations(userDocRef, reservationID)
                                .then(() => {
                                    console.log(
                                        "Updated reservations in Firebase Auth."
                                    );
                                    // Delete reservation from reserve_details
                                    deleteReservationTempSpot(
                                        reservationID,
                                        spotsDocID
                                    )
                                        .then(() => {
                                            alert(
                                                "Reservation has been cancelled"
                                            );
                                            window.location.href =
                                                "reservations.html";
                                        })
                                        .catch((error) => {
                                            console.error(
                                                "Error deleting reservation: ",
                                                error
                                            );
                                        });
                                })
                                .catch((error) => {
                                    console.log(
                                        "Error updating user collection: " +
                                            error
                                    );
                                });
                        })
                        .catch((error) => {
                            console.error(
                                "Error updating parking lot spot: ",
                                error
                            );
                        });
                } else {
                    console.error("No suitable spot found.");
                }
            });
        }
    });
}

// Finds the spot in temp_spots collection
function findSpot(reservationID) {
    return db
        .collection("reserve_details")
        .doc(reservationID)
        .get()
        .then((reservationDoc) => {
            if (reservationDoc.exists) {
                let spotID = reservationDoc.data().spotID;

                // Retrieve the spot information from temp_spots collection
                return db
                    .collection("temp_spots")
                    .doc(spotID)
                    .get()
                    .then((spotDoc) => {
                        if (spotDoc.exists) {
                            let parkingLotDocID =
                                spotDoc.data().parkingLotDocID;
                            let spotsMap = spotDoc.data().spots;

                            // Find the first available spot
                            for (let key in spotsMap) {
                                if (spotsMap[key] === false) {
                                    console.log("Key with value false:", key);
                                    // Returns parking lot id and key
                                    return {
                                        parkingLotDocID: parkingLotDocID,
                                        spots: key,
                                    };
                                }
                            }
                            console.error(
                                "No available spot found in spots map."
                            );
                            return null;
                        } else {
                            console.error(
                                "Spot document not found in temp_spots."
                            );
                            return null;
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting spot document: ", error);
                        return null;
                    });
            } else {
                console.error("Reservation document not found.");
                return null;
            }
        })
        .catch((error) => {
            console.error("Error getting reservation document: ", error);
            return null;
        });
}

// Updates reservations in user collection
function updateReservations(userDocRef, reservationID) {
    return userDocRef.update({
        reservations: firebase.firestore.FieldValue.arrayRemove(reservationID),
    });
}

// Updates parking spot by switching key value to true
function updateParkingSpot(parkingLotDocID, spotKey) {
    const parkingLotsRef = db.collection("parkingLots").doc(parkingLotDocID);
    // Initialize updateSpot
    let updateSpot = {};
    updateSpot[`spots.${spotKey}`] = true;
    // Changes key from false to true to open up spot
    return (
        parkingLotsRef
            // updates parking lot with the changed value in the key
            .update(updateSpot)
            .then(() => {
                console.log(`Parking lot spot ${spotKey} updated to true`);
            })
            .catch((error) => {
                console.error("Error updating parking lot spot: ", error);
            })
    );
}

// Deletes both reservation details and temp spot sub docs to clean database
function deleteReservationTempSpot(reservationID, spotDocID) {
    const reserveDetails = db.collection("reserve_details");
    const tempSpotsRef = db.collection("temp_spots");

    return reserveDetails
        .doc(reservationID)
        .delete()
        .then(() => {
            console.log("Reservation deleted from reserve_details");
            return tempSpotsRef
                .doc(spotDocID)
                .delete()
                .then(() => {
                    console.log("Document deleted from temp_spots");
                });
        });
}
