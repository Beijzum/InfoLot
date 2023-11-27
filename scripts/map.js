function showMap() {
    //-----------------------------------------
    // Define and initialize basic mapbox data
    //-----------------------------------------
    mapboxgl.accessToken =
        "pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ";
    const map = new mapboxgl.Map({
        container: "map", // Container ID
        style: "mapbox://styles/mapbox/streets-v11", // Styling URL
        center: [-123.1207, 49.2827], // Starting position
        zoom: 13, // Starting zoom
    });

    // Add user controls to map
    map.addControl(new mapboxgl.NavigationControl());

    //------------------------------------
    // Listen for when map finishes loading
    // then Add map features
    //------------------------------------
    map.on("load", () => {
        // Defines map pin icon for events
        map.loadImage(
            "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png",
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style.
                map.addImage("eventpin", image); // Pin Icon

                // READING information from "parkingLots" collection in Firestore
                db.collection("parkingLots")
                    .get()
                    .then((allParkingLots) => {
                        const features = []; // Defines an empty array for information to be added to

                        allParkingLots.forEach((doc) => {
                            lat = doc.data().lat;
                            lng = doc.data().lng;
                            console.log(lat, lng);
                            coordinates = [lng, lat];
                            console.log(coordinates);
                            // Coordinates
                            event_name = doc.data().name; // Event Name
                            price = doc.data().rate; // Price
                            hours = doc.data().hours_of_operation; // Hours
                            img = doc.data().posterurl; // Image
                            url = doc.data().link; // URL


                            // Pushes information into the features array
                            // in our application, we have a string description of the parking lot
                            features.push({
                                type: "Feature",
                                properties: {
                                    description:
                                        // Edit popup box contents
                                        `<div class="mapboxgl-popup-content">
                                    
                                <p style="font-weight: bold;">${event_name}</p>
                                <p>${price}</p>
                                <p>${hours}</p>
                                <a href="./reserve.html?docID=${doc.id}" type="button" class="reserve_now_btn btn btn-success">Reserve Now</a>
                                <br><br> 
                                <div id="heart-detail-container">
                                <i id="heart_icon_map" class="material-icons" onclick="addFavouritesIcon(${doc.id})" cursor: pointer;">favorite_border</i>
                                <a href="/each_parking_lot.html?docID=${doc.id}" class="read_more_btn">Details</a>
                                </div>  
                                </div>`,
                                },
                                geometry: {
                                    type: "Point",
                                    coordinates: coordinates,
                                },
                            });
                        });

                        // Adds features as a source of data for the map
                        map.addSource("places", {
                            type: "geojson",
                            data: {
                                type: "FeatureCollection",
                                features: features,
                            },
                        });

                        // Creates a layer above the map displaying the pins
                        // by using the sources that was just added
                        map.addLayer({
                            id: "places",
                            type: "symbol",
                            // source: 'places',
                            source: "places",
                            layout: {
                                "icon-image": "eventpin", // Pin Icon
                                "icon-size": 0.1, // Pin Size
                                "icon-allow-overlap": true, // Allows icons to overlap
                            },
                        });

                        //-----------------------------------------------------------------------
                        // Add Click event listener, and handler function that creates a popup
                        // that displays info from "parkingLots" collection in Firestore
                        //-----------------------------------------------------------------------
                        map.on("click", "places", (e) => {
                            // Extract coordinates array.
                            // Extract description of that place
                            const coordinates =
                                e.features[0].geometry.coordinates.slice();
                            const description =
                                e.features[0].properties.description;

                            // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
                            while (
                                Math.abs(e.lngLat.lng - coordinates[0]) > 180
                            ) {
                                coordinates[0] +=
                                    e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }

                            new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML(description)
                                .addTo(map);
                        });

                        //-----------------------------------------------------------------------
                        // Add mousenter event listener, and handler function to
                        // Change the cursor to a pointer when the mouse is over the places layer.
                        //-----------------------------------------------------------------------
                        map.on("mouseenter", "places", () => {
                            map.getCanvas().style.cursor = "pointer";
                        });

                        // Defaults cursor when not hovering over the places layer
                        map.on("mouseleave", "places", () => {
                            map.getCanvas().style.cursor = "";
                        });
                    });
            }
        );

        // Add the image to the map style.
        map.loadImage(
            "https://cdn-icons-png.flaticon.com/512/61/61168.png",
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style with width and height values
                map.addImage("userpin", image, { width: 10, height: 10 });

                // Adds user's current location as a source to the map
                navigator.geolocation.getCurrentPosition((position) => {
                    const userLocation = [
                        position.coords.longitude,
                        position.coords.latitude,
                    ];
                    console.log(userLocation);
                    if (userLocation) {
                        map.addSource("userLocation", {
                            type: "geojson",
                            data: {
                                type: "FeatureCollection",
                                features: [
                                    {
                                        type: "Feature",
                                        geometry: {
                                            type: "Point",
                                            coordinates: userLocation,
                                        },
                                        properties: {
                                            description: "Your location",
                                        },
                                    },
                                ],
                            },
                        });

                        // Creates a layer above the map displaying the user's location
                        map.addLayer({
                            id: "userLocation",
                            type: "symbol",
                            source: "userLocation",
                            layout: {
                                "icon-image": "userpin", // Pin Icon
                                "icon-size": 0.05, // Pin Size
                                "icon-allow-overlap": true, // Allows icons to overlap
                            },
                        });

                        // Map On Click function that creates a popup displaying the user's location
                        map.on("click", "userLocation", (e) => {
                            // Copy coordinates array.
                            const coordinates =
                                e.features[0].geometry.coordinates.slice();
                            const description =
                                e.features[0].properties.description;

                            new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML(description)
                                .addTo(map);
                        });

                        // Change the cursor to a pointer when the mouse is over the userLocation layer.
                        map.on("mouseenter", "userLocation", () => {
                            map.getCanvas().style.cursor = "pointer";
                        });

                        // Defaults
                        // Defaults cursor when not hovering over the userLocation layer
                        map.on("mouseleave", "userLocation", () => {
                            map.getCanvas().style.cursor = "";
                        });
                    }
                });
            }
        );
    });
}

// Call the function to display the map with the user's location and event pins
showMap();





/*---------------------------- FAVOURITES FUNCTIONS --------------------------------------- */

/* --------Displays correct favourites icon, empty or full ---------- */
function addFavouritesIcon(parkingLotDocID) {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
        // Get Firestore reference for the current user
        let userDocRef = firebase.firestore().collection('users').doc(currentUser.uid);

        // Fetch the current user document to check the status of favourites
        userDocRef.get().then(doc => {
            if (doc.exists) {
                let userFavourites = doc.data().favourites;
                let isFavourited = userFavourites.includes(parkingLotDocID);
                let iconID = 'save-' + parkingLotDocID; // Construct the icon ID

                if (isFavourited) {
                    // Remove from favourites
                    userDocRef.update({
                        favourites: firebase.firestore.FieldValue.arrayRemove(parkingLotDocID)
                    }).then(function () {
                        console.log("Favourite has been removed for " + parkingLotDocID);
                        document.getElementById(iconID).innerText = 'favorite_border';
                    });
                } else {
                    // Add to favourites
                    userDocRef.update({
                        favourites: firebase.firestore.FieldValue.arrayUnion(parkingLotDocID)
                    }).then(function () {
                        console.log("Favourite has been saved for " + parkingLotDocID);
                        document.getElementById(iconID).innerText = 'favorite';
                    });
                }
            } else {
                console.log("No such document!");
            }
        });

    } else {
        // If no user is signed in, redirect to the login page
        window.location.href = "/login.html";
    }
}