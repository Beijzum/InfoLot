async function readJSONParkingLots() {
    const response = await fetch(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2834511,-123.1152548&radius=2000&type=parking&key=AIzaSyD_HJrj3XVbKfYW_0aTWk_IEqaxWQMTYS8'
    )
    const data = await response.text(); //get text file, string
    const parkingLots = JSON.parse(data); //convert to JSON
    //console.log(parkingLots);
    for (let i of parkingLots) {       //iterate thru each parking lot
        let name = i.name;
        //console.log(name);
        let details = name; //creating a string with details
        for (j in i.opening_hours) {
            details += " open now: " + i.opening_hours.open_now;
        }
        for (i of parkingLots) { //iterate thru each parking lot
            console.log(name);
            db.collection("parking lots").add({
                name: i.name,
                details: details
            })
        }
    }
}