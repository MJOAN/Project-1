var database = firebase.database();
var usersRef = database.ref("users");

var manualEntries;
var syncedEntries;

var currentUID = firebase.auth().currentUser;
var displayName = "";
var age = "";
var email = "";
var password = "";

var todaysDate = "10-13-17";


$(document).on("click", "register", function(event) {
    event.preventDefault();

    displayName = $("#name").val().trim();
    age = $("#age").val().trim();
    email = $("#email").val().trim();
    password = $("#password").val().trim();

    usersRef.child(currentUID).set({
        name: displayName,
        age: age
    }).then(function(data) {
        console.log(data);
        window.location.assign("index.html");
    })

});


$(document).on("click", "#add-user-data-btn", function(event) {
    var activities = $("activities").val();
    var symptoms = $("symptoms").val();
    var alcohol = $("alcohol").val();
    var location = $("location").val().trim();
    var comments = $("comments").val().trim();

    console.log(location, "hit");


    user.ref(`users/` + user.uid + `/form`).set({
        activities: activities,
        symptoms: symptoms,
        location: location,
        alcohol: alcohol,
        comment: comments

    }).then(function(data) {
        console.log(activities);
        console.log("hit");
    })