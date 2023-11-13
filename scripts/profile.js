var currentUser;               //points to the document of the user who is logged in

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;
                    let picUrl = userDoc.data().profilePic;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        console.log(userCity)
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (picUrl != null) {
                        console.log(picUrl);
                        // use this line if "mypicdiv" is a "div"
                        $("#mypicdiv").append("<img src='" + picUrl + "'>")
                        $("#mypic-goes-here").attr("src", picUrl);
                    }
                    else
                        console.log("picURL is null");
                })

        } else {
            console.log("no user is logged in")
        }
    }

    )

}
populateInfo();

//call the function to run it 
populateUserInfo();

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
                        //get values from the from
                        userName = document.getElementById('nameInput').value;
                        userSchool = document.getElementById('schoolInput').value;
                        userCity = document.getElementById('cityInput').value;

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            name: userName,
                            school: userSchool,
                            city: userCity,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}

var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}

chooseFileListener();