// https://github.com/orrbcit/techtips-202310/blob/main/scripts/main.js

function insertNameFromFirestore() {
  // Check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // Let's know who the logged-in user is by logging their UID
      currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
      currentUser.get().then((userDoc) => {
        // Get the user name
        var userName = userDoc.data().name;
        console.log(userName);
        //$("#name-goes-here").text(userName); // jQuery
        document.getElementById("name-goes-here").innerText = userName;
      });
    } else {
      console.log("No user is logged in."); // Log a message when no user is logged in
    }
  });
}

insertNameFromFirestore();


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


function readQuote() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get the Firestore document of the user
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get()
        .then(userDoc => {
          // Get the user's image URL and quote
          var userQuote = userDoc.data().quote;

          //Display the quote of the day
          if (userQuote != null) {
            document.getElementById("quote-goes-here").innerHTML = userDoc.data().quote
          }
        });
    };
  });
};

readQuote()


//  https://stackoverflow.com/questions/33329366/how-to-get-search-bar-to-take-input-and-go-to-page
function sendToPage() {
  var input = document.getElementById("search").value;

  db.collection("parkingLots")
    .get()
    .then((docRef) => {
      docRef.forEach((doc) => {   // Loop through the results
        const docID = doc.id;
        const parkingLotCode = doc.data().code

        if (parkingLotCode == input) {    // Input parking lot code (e.g BCITLot1631)
          location.replace("each_parking_lot.html?docID=" + docID);   // Redirect to the appropriate page using the retrieved data
        }
      });
    })
}


//  https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
function getEnterKey() {
  var input = document.getElementById("search");    // Get the input field

  input.addEventListener("keypress", function (event) {   // Execute a function when the user presses a key on the keyboard
    if (event.key === "Enter") {    // If the user presses the "Enter" key on the keyboard
      event.preventDefault();   // Cancel the default action, if needed

      document.getElementById("search-btn").click();     // Trigger the button element with a click
    }
  });
}

getEnterKey()
