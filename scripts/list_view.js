// https://github.com/orrbcit/techtips-202310/blob/main/main.html

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("parkingLotsCardTemplate"); // Retrieve the HTML element with the ID "parkingLotCardTemplate" and store it in the cardTemplate variable.

    db.collection(collection)
        .get() //the collection called "parkingLots"
        .then((allLots) => {
            //var i = 1;  //Optional: if you want to have a unique ID for each parking lot
            allLots.forEach((doc) => {
                //iterate thru each doc
                var title = doc.data().name; // get value of the "name" key
                var details = doc.data().details; // get value of the "details" key
                var parkingCode = doc.data().code; //get unique ID to each parking lot to be used for fetching right image
                var parkingAddress = doc.data().address;
                var parkingHours = doc.data().hours_of_operation;
                var parkingRate = doc.data().rate;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                newcard.querySelector("i").id = "save-" + docID; // Set the ID of the icon to be the same as the docID
                //update title and text and image
                newcard.querySelector(".card-title").innerHTML = title;
                newcard.querySelector(
                    ".card-text"
                ).innerHTML = `${parkingAddress}<br><br>${parkingHours} | ${parkingRate}`;
                newcard.querySelector(
                    ".card-image"
                ).src = `./lot_images/${parkingCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector(".style_button_moreinfo").href =
                    "each_parking_lot.html?docID=" + docID;
                newcard.querySelector("i").onclick = () =>
                    updateFavourites(docID);
                newcard
                    .querySelector(".reserve_button")
                    .addEventListener("click", () => {
                        getReservationBtn(docID);
                    });

                // Ensure that favourites icon is correctly displayed as filled in if docID is in user's favourites
                let currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    let userDocRef = firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.uid);
                    let iconID = "save-" + docID; // Assigns iconID as a unique ID tied to parkingLotIDs

                    db.collection(collection)
                        .get()
                        .then((allLots) => {
                            allLots.forEach((doc) => {
                                // Fetch the current user document to check the status of favourites
                                userDocRef.get().then((userDoc) => {
                                    if (userDoc.exists) {
                                        var favourites =
                                            userDoc.data().favourites;
                                        if (favourites.includes(docID)) {
                                            document.getElementById(
                                                iconID
                                            ).innerText = "favorite"; // Update the icon text
                                        }
                                    }
                                });
                            });
                        });
                }

                //attach to gallery, Example: "parking-lot-go-here"
                document
                    .getElementById(collection + "-go-here")
                    .appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            });
        });
}

displayCardsDynamically("parkingLots"); //input param is the name of the collection

/* FAVOURITES FUNCTIONS */

function updateFavourites(parkingLotDocID) {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
        // Get Firestore reference for the current user
        let userDocRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid);

        // Fetch the current user document to check the status of favourites
        userDocRef.get().then((doc) => {
            if (doc.exists) {
                let userFavourites = doc.data().favourites;
                let isFavourited = userFavourites.includes(parkingLotDocID);
                let iconID = "save-" + parkingLotDocID; // Construct the icon ID

                if (isFavourited) {
                    // Remove from favourites
                    userDocRef
                        .update({
                            favourites:
                                firebase.firestore.FieldValue.arrayRemove(
                                    parkingLotDocID
                                ),
                        })
                        .then(function () {
                            console.log(
                                "Favourite has been removed for " +
                                    parkingLotDocID
                            );
                            document.getElementById(iconID).innerText =
                                "favorite_border";
                        });
                } else {
                    // Add to favourites
                    userDocRef
                        .update({
                            favourites:
                                firebase.firestore.FieldValue.arrayUnion(
                                    parkingLotDocID
                                ),
                        })
                        .then(function () {
                            console.log(
                                "Favourite has been saved for " +
                                    parkingLotDocID
                            );
                            document.getElementById(iconID).innerText =
                                "favorite";
                        });
                }
            } else {
                console.log("No such document!");
            }
        });
    } else {
        // If no user is signed in, redirect to the login page
        window.location.href = "/login.html";
    }
}

/* Reserve button */
function getReservationBtn(parkingLotID) {
    if (parkingLotID) {
        localStorage.setItem("parkingLotDocID", parkingLotID); // Save the parking lot ID to local storage
        window.location.href = `/reserve.html?docID=${parkingLotID}`; // Redirects to review.html with the parking lot ID as its docID
    }
}
