// https://github.com/orrbcit/techtips-202310/blob/main/makepost.html
// https://bcit-cst.notion.site/Demo-10-More-interaction-with-Firestore-Database-573d87d0e72548509d249fd6deb4467b

// Parking lot ID visible to all functions on this page
var parkingLotDocID = localStorage.getItem("parkingLotDocID");

function getParkingLotName(id) {
    db.collection("parkingLots")
        .doc(id)
        .get()
        .then((thisLot) => {
            var parkingLotName = thisLot.data().name;
            document.getElementById("parkingLotName").innerHTML =
                parkingLotName;
        });
}

getParkingLotName(parkingLotDocID);

// Make stars clickable
const stars = document.querySelectorAll(".star"); // Select all elements with the class name "star" and store them in the "stars" variable

// Iterate through each star element
stars.forEach((star, index) => {
    star.addEventListener("click", () => {
        // Add a click event listener to the current star
        for (let i = 0; i <= index; i++) {
            // Fill in clicked star and stars before it
            document.getElementById(`star${i + 1}`).textContent = "star"; // Change the text content of stars to 'star' (filled)
        }
    });
});

// When clicking the submit button after writing a review.
function writeReview() {
    console.log("inside write review");
    // Assign variables to HTML elements
    let parkingLotTitle = document.getElementById("title").value;
    let parkingLotDescription = document.getElementById("description").value;
    let parkingExperience = document.getElementById("experience").value;
    let parkingTraffic = document.getElementById("traffic").value;
    let parkingGated = document.querySelector(
        'input[name="gated"]:checked'
    ).value;
    let parkingUnderground = document.querySelector(
        'input[name="underground"]:checked'
    ).value;

    // Get the star rating
    const stars = document.querySelectorAll(".star"); // Get all the elements with the class "star" and store them in the 'stars' variable
    let parkingLotRating = 0; // Initialize a variable 'parkingLotRating' to keep track of the rating count

    stars.forEach((star) => {
        // Iterate through each element in the 'stars' NodeList using the forEach method
        if (star.textContent === "star") {
            // Check if the text content of the current 'star' element is equal to the string 'star'
            parkingLotRating++; // If the condition is met, increment the 'parkinglotRating' by 1
        }
    });

    console.log(
        parkingLotTitle,
        parkingLotDescription,
        parkingLotRating,
        parkingGated,
        parkingUnderground
    );

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews")
            .add({
                // Add to 'reviews' database
                parkingLotDocID: parkingLotDocID,
                userID: userID,
                title: parkingLotTitle,
                description: parkingLotDescription,
                experience: parkingExperience,
                traffic: parkingTraffic,
                gated: parkingGated,
                underground: parkingUnderground,
                rating: parkingLotRating, // Include the rating in the review
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((docRef) => {
                // Promise callback after document is added. docRef is a variable that holds a reference to the newly added document
                uploadPic(docRef.id); // Calls the newly added document and adds ID property to it. Calls uploadPic function using the review ID as argument.
            });
    }
}

var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener("change", function (e) {
        ImageFile = e.target.files[0]; //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    });
}

listenFileSelect();

//------------------------------------------------
// So, a new review document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this review,
// such that the image name is the reviewID (guaranteed unique).
//
// This function is called AFTER the review has been created,
// and we know the review's document id.
//------------------------------------------------
function uploadPic(reviewDocID) {
    // Uploading a pic to reviews collection using review ID as argument from writeReview()
    console.log("inside uploadPic " + reviewDocID);
    var storageRef = storage.ref("images/" + reviewDocID); //stores img in 'Storage' in database as the review ID name

    storageRef
        .put(ImageFile) //global variable ImageFile
        .then(function () {
            // AFTER .put() is done
            console.log("2. Uploaded to Cloud Storage.");
            storageRef
                .getDownloadURL() // get URL of the uploaded file
                .then(function (url) {
                    // AFTER .getDownloadURL is done,
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // review document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("reviews")
                        .doc(reviewDocID)
                        .update({
                            image: url, // Save the URL into users collection
                            timestamp:
                                firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        // AFTER .update is done
                        .then(function () {
                            console.log("4. Added pic URL to Firestore.");
                            // One last thing to do:
                            // save this reviewDocID into an array for the OWNER
                            // so we can show "my reviews" in the future
                            saveReviewIDforUser(reviewDocID); // Calls the saveReviewIDforUser function and passes reviewDocID (from writeReview) as an argument
                        });
                });
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        });
}

//--------------------------------------------
//saves the review ID for the user, in an array
//--------------------------------------------
function saveReviewIDforUser(reviewDocID) {
    // uses reviewDocID (from writeReview) as an argument. Saves reviewID into user collection.
    firebase.auth().onAuthStateChanged((user) => {
        console.log("user id is: " + user.uid);
        console.log("reviewdoc id is: " + reviewDocID);
        db.collection("users")
            .doc(user.uid)
            .update({
                // Saves in users collection
                reviews: firebase.firestore.FieldValue.arrayUnion(reviewDocID), // saves 'reviews' variable with 'reviewDocID' as a value
            })
            .then(() => {
                console.log("5. Saved to user's document!");
                window.location.href = "thanks_review.html"; // Redirect to the thanks page
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    });
}
