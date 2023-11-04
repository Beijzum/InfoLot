function writeParkingLots() {
    //define a variable for the collection you want to create in Firestore to populate data
    var parkingRef = db.collection("parkingLots");

    parkingRef.add({
        code: "VCCLot",
        name: "Vancouver Convention Centre Lot",
        city: "Vancouver",
        province: "BC",
        address: "1055 Canada Pl, Vancouver, BC V6C 3C1",
        hours_of_operation: "Open 24 hours",
        rate: "$9.00 per hour",
        details: "Details about the parking lot?",
        lat: 49.288769579648026,
        lng: -123.11610559359465,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    parkingRef.add({
        code: "WaterfrontLot695",
        name: "Waterfront Centre Lot #695",
        city: "Vancouver",
        province: "BC",
        address: "200 Burrard St, Vancouver, BC V6C 3L6",
        hours_of_operation: "Open 24 hours",
        rate: "$10.00 per hour",
        details: "Details about the parking lot?",
        lat: 49.28810382362595,
        lng: -123.11541661800067,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

}