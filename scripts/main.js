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

function readQuote() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // Log the UID of the logged-in user

      // Get the Firestore document of the user
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get()
        .then(doc => {
          myposts = doc.data().myposts; // Get array of my posts
          console.log(myposts);

          // Iterate through each post in myposts array
          myposts.forEach(item => {
            db.collection("posts").doc(item).get()
              .then(postDoc => {

                // Access the description field from the post document
                var desc = postDoc.data().description;
                console.log('Description:', desc);

                // Display the description wherever you want
                document.getElementById("quote-goes-here").innerHTML = desc;

              });
          });
        });
    }
  });
}

readQuote();

function displayUserProfileImage() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get the Firestore document of the user
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get()
        .then(userDoc => {
          // Get the user's image URL
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