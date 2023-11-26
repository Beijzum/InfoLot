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
                                    ).innerHTML = `Reservation Date: ${date} <br> Start: ${start} <br> End: ${end} <br> Duration: ${duration} `;
                                    newcard.querySelector(
                                        ".card-image"
                                    ).src = `./lot_images/${parkingCode}.jpg`; //Example: NV01.jpg
                                    newcard.querySelector("a").href =
                                        "each_parking_lot.html?docID=" + docID;
                                    //attach to gallery, Example: "parking-lot-go-here"
                                    parkingLotsCardGroup.appendChild(newcard);
                                });
                        }
                    });
            });
        });
}

