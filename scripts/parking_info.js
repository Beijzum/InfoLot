function writeParkingLots() {
    //define a variable for the collection you want to create in Firestore to populate data
    var parkingRef = db.collection("parkingLots");

    parkingRef.add({
        code: "VCCLot",
        name: "Vancouver Convention Centre West Lot",
        city: "Vancouver",
        province: "BC",
        address: "1055 Canada Pl, Vancouver, BC V6C 3C1",
        hours_of_operation: "Open 24 hours",
        rate: "$9.00 per hour",
        details: "This clean and brightly lit parking facility is located at the Vancouver Convention Centre West on the north side of Canada Place between Burrard Street and Thurlow Street. There are a wide variety of tourist attractions, hospitality services, restaurants and convenient access to transit available nearby.",
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
        details: "This well lit parking facility is located under the Waterfront Centre on the east side of Burrard Street between Canada Place and West Cordova Street. The lot is located within easy walking distance of the Vancouver Convention Centre, Sinclair Centre, Canada Place, Harbour Centre and Gastown with convenient access to transit at the Waterfront Station. There is a car wash available on P1, electric charging stations on P2, Tesla superchargers on P3, and a wide variety of restaurants, hospitality services and shopping destinations nearby.",
        lat: 49.28810382362595,
        lng: -123.11541661800067,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    parkingRef.add({
        code: "WaterfrontLot1292",
        name: "Waterfront Road Lot #1292",
        city: "Vancouver",
        province: "BC",
        address: "200 W Waterfront Rd, Vancouver, BC V6C 1S4",
        hours_of_operation: "Open 24 hours",
        rate: "$5.00 per hour",
        details: "Located east of the Vancouver Convention Centre, this lot is a prime parking facility nestled in the heart of Vancouver's iconic Waterfront Centre. This centrally located lot offers unparalleled access to the city's most prominent destinations, including the Vancouver Convention Centre, historic Gastown, and the picturesque waterfront. Whether you're attending an event at the convention center or simply exploring the city, this parking lot provides a convenient starting point for your urban adventures in this beautiful coastal metropolis.",
        lat: 49.2872665084014,
        lng: -123.1120848661233,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    parkingRef.add({
        code: "CanadaPlaceLot034",
        name: "Parking Indigo - Canada Place Lot #034",
        city: "Vancouver",
        province: "BC",
        address: "999 Canada Pl, Vancouver, BC V6C 3T4",
        hours_of_operation: "Open 24 hours",
        rate: "$9.00 per hour",
        details: "The parking lot at Canada Place by the waterfront is a prime destination for those looking to explore Vancouver's stunning harborfront. Nestled at the iconic Canada Place complex, this conveniently located parking facility offers easy access to the city's vibrant waterfront attractions, including the picturesque Seawall, bustling cruise ship terminals, and the world-renowned Vancouver Convention Centre. Whether you're embarking on a scenic stroll along the harbor, attending a special event, or preparing for a cruise adventure, this parking lot at Canada Place ensures a seamless and convenient starting point for your coastal explorations in the city.",
        lat: 49.28780973010944,
        lng: -123.11300620462623,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    parkingRef.add({
        code: "WaterfrontLot1163",
        name: "Waterfront Station Lot 1163",
        city: "Vancouver",
        province: "BC",
        address: "99 Cambie St, Vancouver, BC V6B 1G1",
        hours_of_operation: "Open 24 hours",
        rate: "$8.00 per hour",
        details: "This 26 stall surface lot located at 99 Cambie Street in the heart of Gastown offers the benefit of proximity and affordability. Accessible from the north foot of Cambie Street adjacent to the Black Frog Pub & Starbucks. Lot 1163 is the perfect parking lot for business people and the budget conscious commuter looking for affordable downtown Reserved parking.",
        lat: 49.28506644283241,
        lng: -123.10862883981648,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    parkingRef.add({
        code: "GranvilleSquareLot525",
        name: "Granville Square and PWC Place Lot #525",
        city: "Vancouver",
        province: "BC",
        address: "200 Granville St, Vancouver, BC V6C 1S4",
        hours_of_operation: "Open 24 hours",
        rate: "$10.00 per hour",
        details: "This brightly lit parking garage is under Granville Square on the north side of West Cordova Street at Granville Street; a clean and dry place to park for tenants and visitors of Granville Square, Price Waterhouse Coopers Place and surrounding area. The facility is located within easy walking distance of the Vancouver Convention Centre, Canada Place, Sinclair Centre/Passport Canada, Waterfront Centre, Harbour Centre and Gastown. There are a wide variety of restaurants, hospitality services, shopping destinations and convenient access to transit available nearby.",
        lat: 49.28628752497898,
        lng: -123.11275527183304,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    parkingRef.add({
        code: "HarbourLot143",
        name: "Harbour Centre Lot #143",
        city: "Vancouver",
        province: "BC",
        address: "450 W Cordova St, Vancouver, BC V6B 4K2",
        hours_of_operation: "Open Mon-Sat, 6am to 12am",
        rate: "$6.00 per hour",
        details: "This clean and brightly lit aboveground parking facility is located at the Harbour Centre on the west corner of Homer Street and West Cordova Street; conveniently close to Gastown and the Waterfront transit/tourist hub. There is a wide variety of restaurants, shopping destinations and hospitality services available nearby.",
        lat: 49.284439964719745,
        lng: -123.1103949280631,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    

}