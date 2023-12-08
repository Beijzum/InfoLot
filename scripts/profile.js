// https://github.com/orrbcit/techtips-202310/blob/main/profile.html
// https://getbootstrap.com/docs/5.0/components/popovers/
// https://bcit-cst.notion.site/Tech-Tip-B01a-How-to-make-a-Post-upload-an-image-with-the-post-7e052ed0ea9b4428807a730df1b7125d

// Global variable with default
var ImageFile = "./images/phantom_thief.png"; // this is the default profile pic for user without profile picture

function addFileChooserListener() {
    // Waits for file selection. Assigns temporary img
    console.log("inside add File chooser listener");
    const fileInput = document.getElementById("mypic-input"); // pointer #1 which is inputting a file
    const image = document.getElementById("mypic-goes-here"); // pointer #2 which is the image class mypic-goes-here
    image.src = ImageFile; //default initially, which is currently phantom_thief.png
    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener("change", function (e) {
        // listens for 'change' event; in this case, input file
        console.log("inside file chooser event handler!");
        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0]; // refers to the array of files selected through the file input
        var blob = URL.createObjectURL(e.target.files[0]); // specifically gets the first file from the array (assuming a single file selection).

        //change the DOM img element source to point to this file
        image.src = blob; //assign the "src" property of the "img" tag
    });
}

addFileChooserListener(); // Call the function

var currentUser; //put this right after you start script tag before writing any functions.
function populateUserInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        // Check if user is signed in:

        if (user) {
            currentUser = db.collection("users").doc(user.uid); // go to the correct user document by referencing to the user uid
            currentUser
                .get() // get the document for current user.
                .then((userDoc) => {
                    //get the data fields of the user
                    // Assign variables to data
                    // don't forget to add these also in saveUserInfo()
                    var userName = userDoc.data().name;
                    var userOccupation = userDoc.data().occupation;
                    var userCity = userDoc.data().city;
                    var userImage = userDoc.data().profilePic;
                    var userQuote = userDoc.data().quote;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userOccupation != null) {
                        document.getElementById("occupationInput").value =
                            userOccupation;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userQuote != null) {
                        document.getElementById("quoteInput").value = userQuote;
                    }
                    if (userImage != null) {
                        document.getElementById("mypic-goes-here").src =
                            userImage;
                    }
                });
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

populateUserInfo(); //call the function to run it

// Enable the form fields with this button
function editUserInfo() {
    // Edit button triggers popover
    $('[data-bs-toggle="popover-edit"]').popover({
        content: "Editing profile!",
        placement: "top",
        trigger: "manual", // Trigger the popover manually
    });

    // Show the popover
    $('[data-bs-toggle="popover-edit"]').popover("show");
    // Close the popover after a specified duration (e.g., 2 seconds)
    setTimeout(() => {
        $('[data-bs-toggle="popover-edit"]').popover("hide");
    }, 2000);
    document.getElementById("personalInfoFields").disabled = false;
}

// Save user info with this button
function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        // Checks if user signed in
        var storageRef = storage.ref("images/" + user.uid); // Stores images in Storage using userID

        storageRef
            .put(ImageFile) //  Async Call to put File Object (global variable ImageFile) onto Cloud
            .then(function () {
                console.log("Uploaded to Cloud Storage.");
                storageRef
                    .getDownloadURL() // Async call to get URL from Cloud
                    .then(function (url) {
                        // Get "url" of the uploaded file
                        console.log("Got the download URL."); //get values from the from the forms
                        // Assign variables to values
                        // don't forget to check with populateUserInfo()
                        userName = document.getElementById("nameInput").value;
                        userOccupation =
                            document.getElementById("occupationInput").value;
                        userCity = document.getElementById("cityInput").value;
                        userQuote = document.getElementById("quoteInput").value;

                        db.collection("users")
                            .doc(user.uid)
                            .update({
                                //Asynch call to save the form fields into Firestore.
                                name: userName,
                                occupation: userOccupation,
                                city: userCity,
                                quote: userQuote,
                                profilePic: url, // Save the URL into users collection
                            })
                            .then(function () {
                                console.log(
                                    "Added Profile Pic URL to Firestore."
                                );
                                console.log("Saved use profile info");
                                // Save button triggers popover
                                $('[data-bs-toggle="popover-save"]').popover({
                                    content: "Profile saved successfully!",
                                    placement: "top",
                                    trigger: "manual", // Trigger the popover manually
                                });

                                // Show the popover
                                $('[data-bs-toggle="popover-save"]').popover(
                                    "show"
                                );
                                // Close the popover after a specified duration (e.g., 2 seconds)
                                setTimeout(() => {
                                    $(
                                        '[data-bs-toggle="popover-save"]'
                                    ).popover("hide");
                                }, 2000);
                                document.getElementById(
                                    "personalInfoFields"
                                ).disabled = true; // Re-disables edit form after saving
                            });
                    });
            });
    });
}

//-------------------------------------------------
// This function asks user to confirm deletion:
// 1. remove document from users collection in firestore
// 2. THEN, remove auth() user from Firebase auth
//-------------------------------------------------
function deleteUser() {
    firebase.auth().onAuthStateChanged((user) => {
        var result = confirm(
            "WARNING " + user.displayName + ": Deleting your User Account!!"
        ); // Double check! Usability Heuristics #5

        if (result) {
            // If confirmed, then go ahead
            db.collection("users")
                .doc(user.uid)
                .delete() // First, delete from Firestore users collection
                .then(() => {
                    console.log("Deleted from Firestore Collection");

                    user.delete()
                        .then(() => {
                            // Next, delete from Firebase Auth
                            console.log("Deleted from Firebase Auth.");
                            alert("user has been deleted");
                            window.location.href = "index.html";
                        })
                        .catch((error) => {
                            console.log(
                                "Error deleting from Firebase Auth " + error
                            );
                        });
                })
                .catch((error) => {
                    console.error("Error deleting user: ", error);
                });
        }
    });
}
