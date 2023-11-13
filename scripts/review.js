var parkingLotDocID = localStorage.getItem("parkingLotDocID");    //visible to all functions on this page

function getParkingLotName(id) {
    db.collection("parkingLots")
        .doc(id)
        .get()
        .then((thisLot) => {
            var parkingLotName = thisLot.data().name;
            document.getElementById("parkingLotName").innerHTML = parkingLotName;
        });
}

getParkingLotName(parkingLotDocID);



// Add this JavaScript code to make stars clickable

// Select all elements with the class name "star" and store them in the "stars" variable
const stars = document.querySelectorAll('.star');

// Iterate through each star element
stars.forEach((star, index) => {
    // Add a click event listener to the current star
    star.addEventListener('click', () => {
        // Fill in clicked star and stars before it
        for (let i = 0; i <= index; i++) {
            // Change the text content of stars to 'star' (filled)
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
    });
});


function writeReview() {
    console.log("inside write review");
    let parkingLotTitle = document.getElementById("title").value;
    let parkingLotDescription = document.getElementById("description").value;
    let hikeFlooded = document.querySelector('input[name="flooded"]:checked').value;
    let hikeScrambled = document.querySelector('input[name="scrambled"]:checked').value;

    // Get the star rating
    // Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
    // Initialize a variable 'hikeRating' to keep track of the rating count
    let parkingLotRating = 0;
    // Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
        // Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
            // If the condition is met, increment the 'hikeRating' by 1
            parkingLotRating++;
        }
    });

    console.log(parkingLotTitle, parkingLotDescription, parkingLotRating, hikeFlooded, hikeScrambled);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            parkingLotDocID: parkingLotDocID,
            userID: userID,
            title: parkingLotTitle,
            description: parkingLotDescription,
            flooded: hikeFlooded,
            scrambled: hikeScrambled,
            rating: parkingLotRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then((docRef) => {
            uploadPic(docRef.id)
        });
    }
};


var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
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
    console.log("inside uploadPic " + reviewDocID);
    var storageRef = storage.ref("images/" + reviewDocID);

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // review document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("reviews").doc(reviewDocID).update({
                        "image": url, // Save the URL into users collection
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                        // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                            // One last thing to do:
                            // save this reviewDocID into an array for the OWNER
                            // so we can show "my reviews" in the future
                            saveReviewIDforUser(reviewDocID);
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

//--------------------------------------------
//saves the review ID for the user, in an array
//--------------------------------------------
function saveReviewIDforUser(reviewDocID) {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user id is: " + user.uid);
        console.log("reviewdoc id is: " + reviewDocID);
        db.collection("users").doc(user.uid).update({
            reviewID: firebase.firestore.FieldValue.arrayUnion(reviewDocID)
        })
            .then(() => {
                console.log("5. Saved to user's document!");
                window.location.href = "thanks.html"; // Redirect to the thanks page
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    })
}