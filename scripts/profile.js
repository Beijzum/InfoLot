function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

//global variable with default
var ImageFile = "./images/phantom_thief.png";

function addFileChooserListener() {
    console.log("inside add File chooser listener");
    const fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    image.src = ImageFile; //default initially
    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {
        console.log("inside file chooser event handler!")
        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(e.target.files[0]);

        //change the DOM img element source to point to this file
        image.src = blob; //assign the "src" property of the "img" tag
    })
}
addFileChooserListener();

var currentUser; //put this right after you start script tag before writing any functions.
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().school;
                    var userCity = userDoc.data().city;
                    var userImage = userDoc.data().profilePic;
                    var userQuote = userDoc.data().quote;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userQuote != null) {
                        document.getElementById("quoteInput").value = userQuote;
                    }
                    if (userImage != null) {
                        document.getElementById("mypic-goes-here").src = userImage;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
                        //get values from the from
                        userName = document.getElementById('nameInput').value;
                        userSchool = document.getElementById('schoolInput').value;
                        userCity = document.getElementById('cityInput').value;
                        userQuote = document.getElementById('quoteInput').value;

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            name: userName,
                            school: userSchool,
                            city: userCity,
                            quote: userQuote,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                document.getElementById('personalInfoFields').disabled =
                                    true;
                            })
                    })
            })
    })
}

//-------------------------------------------------
// This function asks user to confirm deletion:
// 1. remove document from users collection in firestore
// 2. THEN, remove auth() user from Firebase auth
//-------------------------------------------------
function deleteUser() {
    firebase.auth().onAuthStateChanged(user => {

        // Double check! Usability Heuristics #5
        var result = confirm("WARNING " + user.displayName +
            ": Deleting your User Account!!");

        // If confirmed, then go ahead
        if (result) {
            // First, delete from Firestore users collection 
            db.collection("users").doc(user.uid).delete()
                .then(() => {
                    console.log("Deleted from Firestore Collection");

                    // Next, delete from Firebase Auth
                    user.delete().then(() => {
                        console.log("Deleted from Firebase Auth.");
                        alert("user has been deleted");
                        window.location.href = "index.html";
                    }).catch((error) => {
                        console.log("Error deleting from Firebase Auth " + error);
                    });
                }).catch((error) => {
                    console.error("Error deleting user: ", error);
                });
        }
    })
}
