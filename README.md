# Project Title

InfoLot

## 1. Project Description

State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
Our team (DTC-09) is developing a web application that enhances the parking experiences for drivers who face frequent parking issues by providing a handy reserve parking spot feature, real-time data to users for available parking spots, and information on parking lot regulations and fees.

## 2. Names of Contributors

List team members and/or short bio's here...

- Hi, my name is Jason someone please help me. I am a CST student trapped in the BCIT building.
- Hi, my name is Francesca. I am excited to build my first web application with my group in COMP 1800!!!
- Hello, my name is Ian and I'm ready to party with my team members. LET'S GOOOO!

## 3. Technologies and Resources Used

List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

- HTML, CSS, JavaScript
- Bootstrap 5.0 (Frontend library)
- Firebase 8.0 (BAAS - Backend as a Service)
- Map Box API

## 4. Complete setup/installion/usage

State what a user needs to do when they come to your project. How do others start using your code or application?
Here are the steps ...

- Users should sign up/login, so they can access all the features of the web app.
- Users should take a look at the "How It Works" page for a small tutorial on what our web app does.
- Users should use the "Find parking near me" button in the main screen to look for nearby parking.
- Users should click on parking spots on the map or in list view.
- Users should click on 'More Info' in list view to find more information about the parking lot.
- Users should click on the heart icon in list view to favourite the parking lot.
- Users should click on a red marker on the map to see more information about the parking lot.
- Users should click on "Reserve" on the pop-up after clicking on the red marker to reserve a parking spot.
- Users should click on the heart icon on the pop-up if they want to favourite the parking lot.
- Users should click on "Details" on the pop-up after clicking on the red marker to find more information about the parking lot.
- Users should click on "Add to favourites" on the parking lot page if they want to favourite the parking lot.
- Users should click on "Write a review" on the parking lot page if they want to write a review.
- Users should click on "Reserve" on the parking lot page if they want to reserve a parking spot.
- Users should add to favourites, write reviews, or reserve a parking spot at the parking lot page.
- Users should confirm a parking spot, review their reservation details, and submit to confirm the reservation.
- Users should use the hamburger menu to find features, such as their profile, reservations (shows their current reservation), favourites, history and contact us.
- Users should click on the back arrow button on the footer if they want to go to the previous page.
- Users should click on the home button on the footer if they want to go to the main page.
- Users should click on the map icon on the footer if they want to view the map.

## 5. Known Bugs and Limitations

Here are some known bugs:

- Users can choose more than one parking spot to reserve. We want to limit the user to only one reserve spot.
- If the user edits the profile without changing the picture, then no picture is set. We want to make it so users don't have to change their picture every time.
- The favourites button in the map doesn't accurately reflect the user's favourite status. We want to make it more accurate.
- Users can reserve even if they're not logged in. We want to limit what non-users can do on our website.
- Users can review a parking lot more than once. We want to limit what non-users can do on our website.
- Confirming a spot without actually making a reservation still causes the spot to be taken. We want the spot to be taken only after the user confirms the reservation.
- When reservations time-out it doesn't return the spot back to available. We want spots to be freed up after the reservation times out.

## 6. Features for Future

What we'd like to build in the future:

- We want to keep track of users' reviews in their profiles.
- We want to dynamically populate parking lots. We want to use an API to find parking spots that's free or paid.
- We want to build a payment system, so users can pay for reservations as well.
- We want the reservation details to also give directions on how to get to the parking lot.
- We want more info in our map bubble and markers. We also want the cost of the reservation on the markers
- We want a search bar. We want experienced users to search for parking lots.
- We want the contact us to actually send us feedback.
- We want the reservation page to give more information to users.
- We want to allow users to clear their history if they want to clean up their profile.

## 7. Contents of Folder

Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file. Ignores Firebase API and other files.
├── index.html               # landing HTML file - landing page for non-logged in users.
├── 404.html                 # 404 HTML file - informs users that the page doesn't exist.
├── contact_us.html          # Contact us page - users can give feedback to the team.
├── each_parking_lot.html    # Each parking lot HTML file, this is what users see when they go to a parking lot page.
├── favourite.html           # Favourites page - users can see their favourites.
├── history.html             # History page - users can check previously reserved parking spots.
├── how_it_works.html        # How it works page - users can read a quick tutorial on how the web app works.
├── list_view.html           # List view of parking lots - users can see a list view of all nearby parking lots.
├── login.html               # Login page - where users can login to access additional features.
├── main.html                # Main landing page for logged in users.
├── map.html                 # Map box API - users can see nearby parking lots on the map and can click on markers for additional information.
├── profile.html             # Profile page - users can view and edit their profile here.
├── reservations.html        # Reservations page - users can view their current reservation details.
├── reserve_details.html     # Reserve details page - details of a reservation after a user reserves a spot.
├── reserve.html             # Reserve page - each parking lot has its own reserve page that shows which spots are available.
├── review.html              # Review page - each parking lot has its own review page where users can.
├── skeleton.html            # Skeleton page - every page is built off this skeleton
├── template.html            # Template - every page uses this page as a template.
├── thanks_reserve.html      # Reservation confirmation page - users will see this page after reserving a spot.
├── thanks_review.html       # Review confirmation page - users will see this page after reviewing a parking spot.
├── thanks.html              # Contact us confirmation page - users will see this page after sending us feedback.
├── .firebaserc              # Firebase file
├── firebase.json            # Firebase json file
├── firestore.indexes.json   # Firestore json file
├── firestore.rules          # Firestore rules file
├── storage.rules            # Firestore storage rule
└── README.md                # You are reading this document right now.

It has the following subfolders and files:
├── scripts                        # Folder for scripts
    /authentication.js              # Authentication script - allows users to sign up or log into the web app
    /contact_us.js                  # Contact us script - redirect users to a confirmation page
    /each_parking_lot.js            # Each parking lot script - auto-populates parking spots
    /favourites.js                  # Favourites script - auto-populates user's favourite parking lots
    /firebaseAPI_DTC_09.js          # Firebase API - contains project API and other information
    /history.js                     # History script - auto-populate user's previously reserved spots
    /list_view.js                   # List view script - auto-populates parking lots that are nearby
    /main.js                        # Main script - main page reflects user's profile and has buttons to search for parking
    /map.js                         # Map script - contains Mapbox API script that initializes a map that users can interact with
    /parking_info.js                # Parking info script - contains hard-coded parking lot data.
    /profile.js                     # Profile script - allows users to edit, save, and delete their profile
    /reservations.js                # Reservation script - allows users to see their reservation details and cancel reservations
    /reserve_details.js             # Reserve details script - redirects users to a page with their reservation details after confirming a reservation
    /reserve.js                     # Reserve script - allows users to confirm and reserve a parking spot at a specific date, time, and duration
    /review.js                      # Review script - allows users to review parking lots and upload pictures
    /script.js                      # Logout script - contains the logout function, so users can log out
    /skeleton.js                    # Skeleton script - contains different navbar and footer for users with and without an account
    /thanks_reserve.js              # Reservation confirmation script - redirect users to a page where users can see the detail of their reservation

├── images                         # Folder for images
    /how_it_works                  # Photos for how_it_works page
        /browse.png                # Browse image
        /header_img.jpg            # Parking lot header image
        /park.png                  # Park image
        /personalize.png           # Personalize image
        /reserve.png               # Reserve image
    /car1.jpg                      # Landing page header car image
    /carIcon.png                   # Alternative Car icon
    /carIcon2.jpg                  # Alternative car icon
    /carIcon2.png                  # Selected car icon
    /contact_us1.jpg               # Contact us header image
    /explore.jpg                   # Landing page explore image
    /heart_icon_empty.png          # Empty heart icon for favourites
    /icons8-map-marker-48.png      # Map marker icon
    /logo.jpg                      # Logo image
    /personalize.jpg               # Landing page personalize image
    /phantom_thief.png             # Profile demo image
    /reserve.jpg                   # Landing page reserve image

├── lot_images                     # Folder for parking lots
    /AdvancedParkingHowe9167.jpg   # Parking lot image
    /AdvancedParkingLot9023.jpg    # Parking lot image
    /BCITLot1631.jpg               # Parking lot image
    /CanadaPlaceLot034.jpg         # Parking lot image
    /DavieStreet9027.jpg           # Parking lot image
    /DenmanPendrell9175.jpg        # Parking lot image
    /Diamond4264.jpg               # Parking lot image
    /DiamondParkingLot4116.jpg     # Parking lot image
    /EasyParkLot32.jpg             # Parking lot image
    /GranvilleSquareLot525.jpg     # Parking lot image
    /HarbourLot143.jpg             # Parking lot image
    /IndigoLot077.jpg              # Parking lot image
    /ParamountPlace9166.jpg        # Parking lot image
    /ParkPlaceLot295.jpg           # Parking lot image
    /PenderPlaceLot1.jpg           # Parking lot image
    /PivotalBuilding1610.jpg       # Parking lot image
    /TELUSGardens9174.jpg          # Parking lot image
    /VCCLot.jpg                    # Parking lot image
    /WaterfrontLot695.jpg          # Parking lot image
    /WaterfrontLot1163.jpg         # Parking lot image
    /WaterfrontLot1292.jpg         # Parking lot image

├── styles                         # Folder for styles
    /how_it_works.css              # Stylesheet for how it works page
    /reserve.css                   # Stylesheet for reserve page
    /style.css                     # Stylesheet for all other pages

├── text                           # Pre-set footer and navbar
    /footer_after_login.html       # Footer for logged in users
    /footer_before_login.html      # Footer for non-logged in users
    /nav_after_login.html          # Navbar for logged in users
    /nav_before_login.html         # Navbar for non-logged in users

├── .firebase
    /hosting..cache                # Hosting cache for Firebase
```

## 8. References/Citation

**Websites**
<br>
https://mdbootstrap.com/docs/standard/extended/hero/
https://bootstraplily.com/three-column-circle-image-ui-made-with-bootstrap-html/
https://bbbootstrap.com/snippets/simple-navbar-hover-17011029
https://mdbootstrap.com/how-to/bootstrap/circle-image/
https://stackoverflow.com/questions/33329366/how-to-get-search-bar-to-take-input-and-go-to-page
https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
https://getbootstrap.com/docs/5.0/components/popovers/
https://bootstrapbrain.com/demo/?s=components/contacts/contact-4/#!
https://www.mapbox.com/
https://stackoverflow.com/questions/17952024/convert-date-to-end-of-day
https://stackoverflow.com/questions/56663604/how-to-convert-string-to-date-object-in-javascript
https://bootstrapbrain.com/demo/?s=components/contacts/contact-4/#!

**Parking Lot Photos**
<br>
Google Maps for all the parking lot images

**Images Folder**
<br>
https://www.vecteezy.com/vector-art/8348920-eco-car-and-electric-green-car-technology-icon-logo-vector
https://www.cleanpng.com/png-clip-art-portable-network-graphics-car-thai-cuisin-7294339/
https://www.anyrgb.com/en-clipart-hbl43
https://unsplash.com/photos/white-volkswagen-car-parked-during-white-and-blue-cloudy-sky-gJ6mlD1kb_g
https://parksmart.gbci.org/sustainable-innovation-surface-parking
https://www.shutterstock.com/image-photo/shot-landline-telephone-receiver-copy-space-1449121976
https://countyarts.ca/artscene/where-im-from/
Edro Gonzales - Phantom Thief
https://www.resonai.com/blog/indoor-positioning-system
https://en.m.wikipedia.org/wiki/File:Pin-location.pnghttps://commons.wikimedia.org/wiki/File:Valentines-day-hearts-alphabet-blank2-at-coloring-pages-for-kids-boys-dotcom.gif

**How It Works Images**
<br>
https://www.strongtowns.org/journal/2022/11/22/what-comes-next-after-abolishing-parking-mandates
https://figma.com/ - icons
https://www.shutterstock.com/image-vector/globe-icon-global-internet-search-vector-1608005833

**Techtips Github**
<br>
https://github.com/orrbcit/techtips-202310
https://github.com/orrbcit/techtips-202310/blob/main/makepost.html
https://github.com/orrbcit/techtips-202310/blob/main/main.html
https://github.com/orrbcit/techtips-202310/blob/main/profile.html

**Techtips Notions**
<br>
https://bcit-cst.notion.site/1800-Tech-Tips-202330-375ca5b360eb49eeb78be913730ade84
https://bcit-cst.notion.site/Demo-06-More-Front-End-617fe502a74749039fa924555341382b
https://bcit-cst.notion.siteDemo-07-Firebase-Quick-Start-and-Authentication-2952b92ddb0048f79e73120664a146ce
https://bcit-cst.notion.site/Demo-09-Firebase-Firestore-Database-f61080202173436396e55851240fc277
https://bcit-cst.notion.site/Demo-10-More-interaction-with-Firestore-Database-573d87d0e72548509d249fd6deb4467b
https://bcit-cst.notion.site/Demo-11-More-fire-with-Firestore-Database-c226f74568b246738f779f6f31e039f6
https://bcit-cst.notion.site/Tech-Tip-B01a-How-to-make-a-Post-upload-an-image-with-the-post-7e052ed0ea9b4428807a730df1b7125d
https://bcit-cst.notion.site/Tech-Tip-B02-How-can-we-link-parking-spot-buttons-to-the-database-for-toggling-availability-and-en-988b5cb4883245d2828a4509dcacdd7a
