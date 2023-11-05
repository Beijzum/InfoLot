function displayParkingInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("parkingLots")
        .doc(ID)
        .get()
        .then(doc => {
            thisLot = doc.data();
            parkingCode = thisLot.code;
            parkingLotName = doc.data().name;

            // only populate title, and image
            document.getElementById("parkingLotName").innerHTML = parkingLotName;
            let imgEvent = document.querySelector(".parking-img");
            imgEvent.src = "../lot_images/" + parkingCode + ".jpg";
            document.getElementById("details-go-here").innerHTML = `${thisLot.address}<br>${thisLot.hours_of_operation}`;
        });
}
displayParkingInfo();
