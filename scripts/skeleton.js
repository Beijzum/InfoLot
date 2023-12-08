// https://bcit-cst.notion.sitedemo-07-firebase-quick-start-and-authentication-2952b92ddb0048f79e73120664a146ce/
//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //if the pointer to "user" object is not null, then someone is logged in
      // User is signed in.
      // Do something for the user here.
      console.log($("#navbarPlaceholder").load('./text/nav_after_login.html'));
      console.log($("#footerPlaceholder").load('./text/footer_after_login.html'));
    } else {
      // No user is signed in.
      console.log($("#navbarPlaceholder").load('./text/nav_before_login.html'));
      console.log($("#footerPlaceholder").load('./text/footer_before_login.html'));
    }
  });
}
loadSkeleton(); //invoke the function
