function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;

            //method #2:  insert using jquery
            $("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function

function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($("#navbarPlaceholder").load("./text/nav_after_login.html"));
            console.log($("#footerPlaceholder").load("./text/footer.html"));
        } else {
            // No user is signed in.
            console.log($("#navbarPlaceholder").load("./text/nav_before_login.html"));
            console.log($("#footerPlaceholder").load("./text/footer.html"));
        }
    });
}
loadSkeleton(); //invoke the function
