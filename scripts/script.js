// https://bcit-cst.notion.sitedemo-07-firebase-quick-start-and-authentication-2952b92ddb0048f79e73120664a146ce/
//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // Sign-out successful.
            console.log("logging out user");
        })
        .catch((error) => {
            // An error happened.
        });
}
