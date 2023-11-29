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
        details:
            "This clean and brightly lit parking facility is located at the Vancouver Convention Centre West on the north side of Canada Place between Burrard Street and Thurlow Street. There are a wide variety of tourist attractions, hospitality services, restaurants and convenient access to transit available nearby.",
        lat: 49.288769579648026,
        lng: -123.11610559359465,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });
    parkingRef.add({
        code: "WaterfrontLot695",
        name: "Waterfront Centre Lot #695",
        city: "Vancouver",
        province: "BC",
        address: "200 Burrard St, Vancouver, BC V6C 3L6",
        hours_of_operation: "Open 24 hours",
        rate: "$10.00 per hour",
        details:
            "This well lit parking facility is located under the Waterfront Centre on the east side of Burrard Street between Canada Place and West Cordova Street. The lot is located within easy walking distance of the Vancouver Convention Centre, Sinclair Centre, Canada Place, Harbour Centre and Gastown with convenient access to transit at the Waterfront Station. There is a car wash available on P1, electric charging stations on P2, Tesla superchargers on P3, and a wide variety of restaurants, hospitality services and shopping destinations nearby.",
        lat: 49.28810382362595,
        lng: -123.11541661800067,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    parkingRef.add({
        code: "WaterfrontLot1292",
        name: "Waterfront Road Lot #1292",
        city: "Vancouver",
        province: "BC",
        address: "200 W Waterfront Rd, Vancouver, BC V6C 1S4",
        hours_of_operation: "Open 24 hours",
        rate: "$5.00 per hour",
        details:
            "Located east of the Vancouver Convention Centre, this lot is a prime parking facility nestled in the heart of Vancouver's iconic Waterfront Centre. This centrally located lot offers unparalleled access to the city's most prominent destinations, including the Vancouver Convention Centre, historic Gastown, and the picturesque waterfront. Whether you're attending an event at the convention center or simply exploring the city, this parking lot provides a convenient starting point for your urban adventures in this beautiful coastal metropolis.",
        lat: 49.2872665084014,
        lng: -123.1120848661233,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    parkingRef.add({
        code: "CanadaPlaceLot034",
        name: "Parking Indigo - Canada Place Lot #034",
        city: "Vancouver",
        province: "BC",
        address: "999 Canada Pl, Vancouver, BC V6C 3T4",
        hours_of_operation: "Open 24 hours",
        rate: "$9.00 per hour",
        details:
            "The parking lot at Canada Place by the waterfront is a prime destination for those looking to explore Vancouver's stunning harborfront. Nestled at the iconic Canada Place complex, this conveniently located parking facility offers easy access to the city's vibrant waterfront attractions, including the picturesque Seawall, bustling cruise ship terminals, and the world-renowned Vancouver Convention Centre. Whether you're embarking on a scenic stroll along the harbor, attending a special event, or preparing for a cruise adventure, this parking lot at Canada Place ensures a seamless and convenient starting point for your coastal explorations in the city.",
        lat: 49.28780973010944,
        lng: -123.11300620462623,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    parkingRef.add({
        code: "WaterfrontLot1163",
        name: "Waterfront Station Lot 1163",
        city: "Vancouver",
        province: "BC",
        address: "99 Cambie St, Vancouver, BC V6B 1G1",
        hours_of_operation: "Open 24 hours",
        rate: "$8.00 per hour",
        details:
            "This 26 stall surface lot located at 99 Cambie Street in the heart of Gastown offers the benefit of proximity and affordability. Accessible from the north foot of Cambie Street adjacent to the Black Frog Pub & Starbucks. Lot 1163 is the perfect parking lot for business people and the budget conscious commuter looking for affordable downtown Reserved parking.",
        lat: 49.28506644283241,
        lng: -123.10862883981648,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    parkingRef.add({
        code: "GranvilleSquareLot525",
        name: "Granville Square and PWC Place Lot #525",
        city: "Vancouver",
        province: "BC",
        address: "200 Granville St, Vancouver, BC V6C 1S4",
        hours_of_operation: "Open 24 hours",
        rate: "$10.00 per hour",
        details:
            "This brightly lit parking garage is under Granville Square on the north side of West Cordova Street at Granville Street; a clean and dry place to park for tenants and visitors of Granville Square, Price Waterhouse Coopers Place and surrounding area. The facility is located within easy walking distance of the Vancouver Convention Centre, Canada Place, Sinclair Centre/Passport Canada, Waterfront Centre, Harbour Centre and Gastown. There are a wide variety of restaurants, hospitality services, shopping destinations and convenient access to transit available nearby.",
        lat: 49.28628752497898,
        lng: -123.11275527183304,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    parkingRef.add({
        code: "HarbourLot143",
        name: "Harbour Centre Lot #143",
        city: "Vancouver",
        province: "BC",
        address: "450 W Cordova St, Vancouver, BC V6B 4K2",
        hours_of_operation: "Open Mon-Sat, 6am to 12am",
        rate: "$6.00 per hour",
        details:
            "This clean and brightly lit aboveground parking facility is located at the Harbour Centre on the west corner of Homer Street and West Cordova Street; conveniently close to Gastown and the Waterfront transit/tourist hub. There is a wide variety of restaurants, shopping destinations and hospitality services available nearby.",
        lat: 49.284439964719745,
        lng: -123.1103949280631,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    parkingRef.add({
        code: "IndigoLot077",
        name: "Parking Indigo Vancouver - Lot #077",
        city: "Vancouver",
        province: "BC",
        address: "1130 W Pender St, Vancouver, BC V6E 4A4",
        hours_of_operation: "Open Mon-Fri, 6am to 6pm",
        rate: "$7.00 per hour",
        details:
            "Conveniently nestled in the heart of downtown Vancouver, Lot 077 at 1130 West Pender Street offers a prime parking solution for both residents and visitors. This secure and well-maintained parking facility provides a hassle-free experience for all your parking needs.",
        lat: 49.2875299281045,
        lng: -123.12163874381025,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    parkingRef.add({
        code: "AdvancedParkingLot9023",
        name: "Advanced Parking West Pender St - Lot #9023",
        city: "Vancouver",
        province: "BC",
        address: "1095 W Pender St, Vancouver, BC V6E 2M6",
        hours_of_operation: "Open Mon-Fri, 7am to 7pm",
        rate: "$9.00 per hour",
        details:
            "Experience unrivaled parking convenience at Advanced Parking Lot #9023, located on West Pender Street in the heart of Vancouver's dynamic downtown district. This modern parking facility is your secure, accessible, and stress-free solution for all your parking needs.",
        lat: 49.287622463423915,
        lng: -123.11934154663095,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    parkingRef.add({
        code: "ParkPlaceLot295",
        name: "Park Place Parking - Lot #295",
        city: "Vancouver",
        province: "BC",
        address: "666 Burrard St, Vancouver, BC V6C 2X8",
        hours_of_operation: "Open 24 hours",
        rate: "$7.00 per hour",
        details:
            "Discover the perfect parking solution at Park Place Parking Lot #295, nestled in a prime location in the heart of the city. This well-maintained parking facility offers a secure and convenient experience for all your parking needs.",
        lat: 49.28526403391055,
        lng: -123.11954315040722,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    parkingRef.add({
        code: "DiamondParkingLot4116",
        name: "Diamond Parking - Lot #4116",
        city: "Vancouver",
        province: "BC",
        address: "550 Hornby St #2E7, Vancouver, BC V6C 2E7",
        hours_of_operation: "Open 24 hours",
        rate: "$9.00 per hour",
        details:
            "Diamond Parking Lot #4116 presents an urban oasis for your parking needs. Tucked conveniently in the heart of downtown Vancouver, this parking lot offers a practical and accessible solution for your vehicle. It provides a safe, well-lit space where your car can find a temporary home, sheltered from the elements. Located within reach of various attractions and businesses, this parking lot ensures your convenience as you explore the bustling city. Say goodbye to parking hassles and embrace the ease and peace of mind that comes with its parking facilities.",
        lat: 49.285532312243255,
        lng: -123.11745673693052,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    parkingRef.add({
        code: "EasyParkLot32",
        name: "Easy Park - Lot #32",
        city: "Vancouver",
        province: "BC",
        address: "777 Dunsmuir St, Vancouver, BC V6C 1X6",
        hours_of_operation: "Open 24 hours",
        rate: "$8.30 per hour",
        details:
            "Welcome to the Pacific Centre Mall's Underground Parking Lot, conveniently located under the bustling North end of the mall with an entrance on Southbound Howe Street between Pender and Dunsmuir. Our multi-level parkade offers 364 parking stalls and operates as an unattended facility, granting you the flexibility to come and go at your leisure. Please note the 6-foot 6-inch height restriction to ensure standard-sized vehicles can access the facility. We understand the need for convenience, which is why we offer 24/7 access, accommodating your schedule whenever you decide to visit. Whether you're shopping, dining, or enjoying the attractions in the area, our secure and accessible parking facility is ready to serve you.",
        lat: 49.28512640856986,
        lng: -123.11619073430639,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    parkingRef.add({
        code: "PenderPlaceLot1",
        name: "Pender Place - Lot #1",
        city: "Vancouver",
        province: "BC",
        address: "750 W Pender St, Vancouver, BC V6C 2T7",
        hours_of_operation: "Open Mon-Fri, 6am to 7pm",
        rate: "$9.50 per hour",
        details:
            "This clean and brightly lit parking facility is located under Pender Place on the south side of West Pender Street between Howe Street and Granville Street; within easy walking distance of Pacific Centre, Canada Place, Vancouver Convention Centre and the Waterfront. There are a wide variety of restaurants, hospitality services, shopping destinations and convenient access to transit available nearby.",
        lat: 49.285171606751106,
        lng: -123.11586978528332,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    parkingRef.add({
        code: "BCITLot1631",
        name: "BCIT - Downtown Campus - Lot #1631",
        city: "Vancouver",
        province: "BC",
        address: "555 Seymour St, Vancouver, BC V6B 3H6",
        hours_of_operation: "Open Mon-Fri, 5am to 10pm",
        rate: "$8.50 per hour",
        details:
            "This well-maintained and brightly lit parking facility is located on the northwest side of Seymour Street between Dunsmuir Street and West Pender Street; just under the BCIT Campus in the heart of Downtown Vancouver. Many transit options, shopping destinations and restaurants are within easy walking distance and there are superior safety features including security patrols and 'panic' response stations.",
        lat: 49.283526964350884,
        lng: -123.11514022444909,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    parkingRef.add({
        code: "TELUSGardens9174",
        name: "TELUS Gardens Residences - Parking Lot #9174",
        city: "Vancouver",
        province: "BC",
        address: "783 Richards St, Vancouver, BC V6B 0M6",
        hours_of_operation: "6am-11pm",
        rate: "$9.00 per hour",
        details:
            "Vancouver's newest parkade! A beautiful 50 stall underground parkade at the corner of Robson and Richards Street. The parkade is a pay by license plate operation that has paystations at each elevator lobby for immediate convenience. All you need to do is park, pay at the paystation with your license plate and be on your way to your destination. Electric vehicles parked in the stalls with chargers must pay Chargepoint for the power usage and at the meter for the parking.",
        lat: 49.28089214915153,
        lng: -123.11743098574253,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });

    parkingRef.add({
        code: "AdvancedParkingHowe9167",
        name: "Advanced Parking Howe St - Lot #9167",
        city: "Vancouver",
        province: "BC",
        address: "980 Howe Street, Vancouver BC V6Z 1N9",
        hours_of_operation: "7am-7pm",
        rate: "$5.50 per hour",
        details:
            "This new underground parkade featuring 217 stalls under brand new office tower at 980 Howe Street is clean, bright, security patrolled, with large - regular and small car stalls - motorbike parking - EV stations plus handicap parking. This parkade is located near hotels and retail shopping centers",
        lat: 49.28013108501068,
        lng: -123.12324671093894,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });

    parkingRef.add({
        code: "PivotalBuilding1610",
        name: "858 Beatty - Pivotal Building - Lot #1610",
        city: "Vancouver",
        province: "BC",
        address: "858 Beatty St, Vancouver, BC V6B 1C1",
        hours_of_operation: "7am-1am",
        rate: "$5.00 per hour",
        details:
            "This clean and brightly lit underground parking facility is located at the Pivotal Building on the east corner of Beatty Street and Smithe Street; close to BC Place Stadium and Yaletown. There are a wide variety of restaurants, hospitality services, shopping destinations and convenient access to transit available nearby.",
        lat: 49.27740089865711,
        lng: -123.11465106955497,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });

    parkingRef.add({
        code: "Diamond4264",
        name: "Diamond Parking Lot 4264",
        city: "Vancouver",
        province: "BC",
        address: "1022 Nelson St #506, Vancouver, BC V6E 4S7",
        hours_of_operation: "24/7",
        rate: "$9.00 per hour",
        details:
            "Lot info: The parking lot is gated with access between 6AM - 11:30PM only. Clearance is 7 ft. This is a virtual permit; no physical permit is sent out.Once purchased please ensure your license plate of the vehicles parking are correctly inputted and registered to your account/ permit to avoid any parking notices.",
        lat: 49.281869952658006,
        lng: -123.1271649874657,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });

    parkingRef.add({
        code: "ParamountPlace9166",
        name: "Paramount Place Parking Lot #9166",
        city: "Vancouver",
        province: "BC",
        address: "900 Burrard St, Vancouver, BC V6Z 3G5",
        hours_of_operation: "24/7",
        rate: "$5.00 per hour +tax",
        details:
            "This underground lot is located at Paramount Place, underneath the Scotiabank Theatre, on Burrard Street, between Barclay and Smithe Street.  Aside from serving as the primary parking location for visitors to the ScotiaBank Theatre, it is in close proximity to a variety of other destinations, including the Robson Street Shopping District, the Provincial Law Courts, Earls Restaurant, IGA Marketplace and the Sutton Place Hotel.",
        lat: 49.282150151047,
        lng: -123.12452188256384,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });

    parkingRef.add({
        code: "DavieStreet9027",
        name: "1237 Davie Street - Lot #9027",
        city: "Vancouver",
        province: "BC",
        address: "1237 Davie St, Vancouver, BC V6E 1N4",
        hours_of_operation: "24/7",
        rate: "$5.00 per hour",
        details:
            "This underground parkade is located on Davie Street, between Bute and Jervis. There are a wide variety of restaurants, hotels, professional services, shopping destinations and convenient access to transit available nearby",
        lat: 49.282479471471575,
        lng: -123.13370656576048,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });

    parkingRef.add({
        code: "DenmanPendrell9175",
        name: "Denman & Pendrell - Lot #9175",
        city: "Vancouver",
        province: "BC",
        address: "1125 Denman Street, Vancouver BC V6G 2M7",
        hours_of_operation: "24/7",
        rate: "$5.50 per hour +tax",
        details:
            "This surface parking lot is located at the heart of English Bay one block up from Davie Street. With easy access off Pendrell Street we are open 24/7 and within walking distance to unlimited entertainment and dining options. Residents and tourists alike are invited to park and enjoy this prominent location so close to the beach! Rental and filming requests are also welcome.",
        lat: 49.288159118110286,
        lng: -123.14075283215536,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
    });
}
