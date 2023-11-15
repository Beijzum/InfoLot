// Check reserve_details userID
// Link to that userID and pull the reserve_details: parking lot name, date, start time, and duration

// Update the HTML elements with reservation details
document.getElementById("parkingLotName").innerText += reserveDetails.parkingLotDocName;
document.getElementById("date").innerText += reserveDetails.date;
document.getElementById("startTime").innerText += reserveDetails.start;
document.getElementById("duration").innerText += reserveDetails.duration;
