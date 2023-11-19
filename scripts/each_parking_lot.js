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

// function writeReviewBtn() {
//     let params = new URL(window.location.href) //get the url from the search bar
//     let ID = params.searchParams.get("docID");
//     localStorage.setItem('parkingLotDocID', ID);
//     window.location.href = 'review.html';
// }


// Add parking lot ID as favourites
// function saveFavouriteParkingLot(userID, parkingLotId) {
//     var userDocRef = db.collection("users").doc(userID);        // Get a reference to the user document in Firestore

//     userDocRef.update({         // Update the user document with the parking lot ID with favourites as a variable
//         favourites: firebase.firestore.FieldValue.arrayUnion(parkingLotId)
//     })
//         .then(function () {
//             console.log('Added Parking Lot ID to user favorites.');
//         })
//         .catch(function (error) {
//             console.error('Error updating user favorites:', error);
//         });
// }


function addFavouritesBtn() {
    let params = new URL(window.location.href);         // Parse the parameters from the URL of current window
    var parkingLotID = params.searchParams.get("docID");    // Grabs docID from URL 

    if (parkingLotID) {
        updateFavourites(parkingLotID);      // Call the function to save the favorite
    } else {
        console.error("Parking lot ID not found in the URL.");
    }
}


function updateFavourites(parkingLotID) {
    currentUser.get().then(userDoc => {
        let favourites = userDoc.data().favourites;
        let iconID = "heart_icon"       // ID of icon in html
        let isFavourited = (favourites.includes(parkingLotID)); // check if this parkingLotID exists in favourites array

        if (isFavourited) {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayRemove(parkingLotID)
            })
                .then(() => {
                    console.log("item was removed " + parkingLotID)
                    document.getElementById(iconID).innerText = 'favorite_border'
                })
        } else {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayUnion(parkingLotID)
            })
                .then(() => {
                    console.log("item was added " + parkingLotID)
                    document.getElementById(iconID).innerText = 'favorite'
                })
        }
    }
    )
}

// let iconID = "heart_icon"
// currentUser.get().then(userDoc => {     // Checks the database if user has favourited parking lot already
//     //get the user name
//     var favourites = userDoc.data().favourites;
//     if (favourites.includes(parkingLotID)) {
//         document.getElementById(iconID).innerText = 'favorite';
//     }
// })


/* Populate the reviews */
function populateReviews() {
    console.log("test");
    let parkingLotCardTemplate = document.getElementById("reviewCardTemplate");
    let parkingLotCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let parkingLotID = params.searchParams.get("docID");


    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("reviews")
        .where("parkingLotDocID", "==", parkingLotID)
        .get()
        .then((allReviews) => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach((doc) => {
                var title = doc.data().title;
                var description = doc.data().description;
                var experience = doc.data().experience;
                var traffic = doc.data().traffic;
                var gated = doc.data().gated;
                var underground = doc.data().underground;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let reviewCard = parkingLotCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;
                reviewCard.querySelector(".experience").innerHTML = `Experience: ${experience}`;
                reviewCard.querySelector(".traffic").innerHTML = `Traffic: ${traffic}`;
                reviewCard.querySelector(".gated").innerHTML = `Gated: ${gated}`;
                reviewCard.querySelector(".underground").innerHTML = `Underground: ${underground}`;
                reviewCard.querySelector(".rating").innerHTML = `Rating: ${rating}`;


                // Populate the star rating based on the rating value

                // Initialize an empty string to store the star rating HTML
                let starRating = "";
                // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < rating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
                // After the first loop, this second loop runs from i=rating to i<5.
                for (let i = rating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                reviewCard.querySelector(".star-rating").innerHTML = starRating;

                parkingLotCardGroup.appendChild(reviewCard);
            });
        });
}

populateReviews();


/* Display profile image in reviews */
function displayUserProfileImage() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Get the Firestore document of the user
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    // Get the user's image URL and quote
                    var userImage = userDoc.data().profilePic;

                    // Display the image wherever you want
                    if (userImage != null) {
                        document.getElementById("mypic-goes-here").src = userImage;
                    };

                });
        };
    });
};

displayUserProfileImage()