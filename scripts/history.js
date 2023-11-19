function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getHistory(user)
        } else {
            console.log("No user is signed in");
        }
    });
}

doAll();


//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getHistory(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

            // Get the Array of bookmarks
            let history = userDoc.data().history;
            console.log(history);

            // Get pointer the new card template
            let newcardTemplate = document.getElementById("savedCardTemplate");

            // Iterate through the ARRAY of bookmarked hikes (document ID's)
            history.forEach(parkingLotID => {
                console.log(parkingLotID);
                db.collection("parkingLots").doc(parkingLotID).get().then(doc => {
                    var title = doc.data().name;       // get value of the "name" key
                    var details = doc.data().details;  // get value of the "details" key
                    var parkingCode = doc.data().code;    //get unique ID to each parking lot to be used for fetching right image
                    var parkingAddress = doc.data().address;
                    var parkingHours = doc.data().hours_of_operation;
                    var parkingRate = doc.data().rate;
                    var docID = doc.id;

                    let newcard = newcardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                    //update title and text and image
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-text').innerHTML = `${parkingAddress}<br><br>${parkingHours} | ${parkingRate}`;
                    newcard.querySelector('.card-image').src = `./lot_images/${parkingCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector('a').href = "each_parking_lot.html?docID=" + docID;

                    //attach to gallery, Example: "parking-lot-go-here"
                    parkingLotsCardGroup.appendChild(newcard);
                })
            })
        })
}
