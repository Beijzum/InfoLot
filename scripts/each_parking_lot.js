var currentUser;

/* --------Displays the parking lot info ---------- */
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

            checkUserFavourites(ID);      // Check user favourites when loading page

        });

}
displayParkingInfo();




/* --------Displays correct text inside favourites button ---------- */
function checkAndUpdateFavouritesButton() {
    let parkingLotDocId = (new URL(window.location.href)).searchParams.get("docID");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get().then(userDoc => {
                if (userDoc.exists) {
                    let userData = userDoc.data();
                    let favourites = userDoc.data().favourites;// Replace with your field name

                    // Check if the field exists and contains the specific item
                    if (favourites && favourites.includes(parkingLotDocId)) {
                        console.log("The item is favourited");
                        document.getElementById("favourites").innerText = "Remove from favourites";
                        // Perform operations based on the presence of the item
                    } else {
                        console.log("The item is not favourited");
                        document.getElementById("favourites").innerText = "Add to favourites";
                        // Handle the absence of the item
                    }
                } else {
                    document.getElementById("favourites").innerText = "Add to favourites";
                }
            })
        } else {
            // No user is signed in.
            console.log("No user is logged in.");
            document.getElementById("favourites").innerText = "Add to favourites";
        }
    });
}
checkAndUpdateFavouritesButton();


/*---------------------------- FAVOURITES FUNCTIONS --------------------------------------- */

/* What happens when the favourites button is clicked */
function addFavouritesBtn() {
    let currentUser = firebase.auth().currentUser;
    // Grabs doc id from the URL
    let docID = (new URL(window.location.href)).searchParams.get("docID");

    if (currentUser) {
        // Updates user's favourites in firestore 
        updateFavourites(docID);

    } else {
        // If no user is signed in, redirect to the login page
        window.location.href = "/login.html";
    }
}


/* Function to update firestore favourites in user collection and changes
the favourites button */
function updateFavourites(parkingLotDocID) {
    currentUser.get().then(userDoc => {
        let favourites = userDoc.data().favourites;
        let isFavourited = favourites.includes(parkingLotDocID); // check if hikeID exists in the bookmarks array
        console.log(isFavourited)
        let iconID = "heart_icon"

        if (isFavourited) {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayRemove(parkingLotDocID)
            }).then(function () {
                document.getElementById("favourites").innerText = "Add to favourites";
                document.getElementsByClassName(iconID).innerText = 'favorite_border';
                console.log("Favourites has been removed for " + parkingLotDocID);
            })

        } else {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayUnion(parkingLotDocID)
            }).then(function () {
                document.getElementById("favourites").innerText = "Remove from favourites";
                document.getElementByClassName(iconID).innerText = 'border';
                console.log("Favourites has been saved for " + parkingLotDocID);
            })
        }
    })
}















// function addFavouritesBtn() {
//     var userId = firebase.auth().currentUser.uid;
//     let params = new URL(window.location.href);         // Parse the parameters from the URL of current window
//     var parkingLotId = params.searchParams.get("docID");    // Grabs docID from URL 

//     if (parkingLotId) {
//         saveFavouriteParkingLot(userId, parkingLotId);      // Call the function to save the favorite
//     } else {
//         console.error("Parking lot ID not found in the URL.");
//     }
// }

/*---------------------------- REVIEWS FUNCTIONS --------------------------------------- */

/* Upon clicking write review button, user is directed to review page to fill out review */
function writeReviewBtn() {
    let parkingLotID = (new URL(window.location.href)).searchParams.get("docID"); // Searches for the value of docID in the current windows URL

    if (parkingLotID) {
        localStorage.setItem('parkingLotDocID', parkingLotID);   // Save the parking lot ID to local storage
        window.location.href = `/review.html?docID=${parkingLotID}`; // Redirects to review.html with the parking lot ID as its docID
    }
}

/* Populate the reviews */
function populateReviews() {
    console.log("test populateReviews");
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


/* Display profile image when leaving reviews */
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

/* OLD CODE */
// function writeReviewBtn() {
//     let params = new URL(window.location.href) //get the url from the search bar
//     let ID = params.searchParams.get("docID");
//     localStorage.setItem('parkingLotDocID', ID);
//     window.location.href = 'review.html';
// }
