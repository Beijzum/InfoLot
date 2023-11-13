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