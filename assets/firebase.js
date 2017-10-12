var config = {
    apiKey: "AIzaSyAA1EgZPbbAMpIzWeVVtodHCqSjHy-G14c",
    authDomain: "project-1-7c513.firebaseapp.com",
    databaseURL: "https://project-1-7c513.firebaseio.com",
    projectId: "project-1-7c513",
    storageBucket: "project-1-7c513.appspot.com",
    messagingSenderId: "173560237058"
};

firebase.initializeApp(config);

var database = firebase.database().ref();

$("#input-form", "button").on("click", function(event) {
    event.preventDeafault();

    var currentUID = window.user;
    var activities = $("#activities").val().trim();
    var symptoms = $("#symptoms").val().trim();
    var alcohol = $("#alcohol").val().trim();
    var location = $("#location").val().trim();
    var comments = $("#comments").val().trim();

    var user = {
        activities: activities,
        symptoms: symptoms,
        location: location,
        alcohol: alcohol,
        comments: comments
    };

    // .key()
    database.ref(`users/` + currentUID + `/form`).push(user).then(function() {}).catch(function(error) {});

    console.log(user.name);
    console.log(user.activities);
    console.log(user.symptoms);
    console.log(user.location);
    console.log(user.entry);

    // clear form after initialize
    $("#activities").val("");
    $("#symptoms").val("");
    $("#location").val("");
    $("#alcohol").val("");
    $("#comments").val("");
});

database.once("child_added", function(childSnapshot, prevChildKey) {
    // console.log("added", snap.key(), snap.val());
    console.log(childSnapshot.val());

    var activities = childSnapshot.val().activities;
    var symptoms = childSnapshot.val().symptoms;
    var location = childSnapshot.val().location;
    var alcohol = childSnapshot.val().alcohol;
    var comments = childSnapshot.val().comments;

    console.log(activities);
    console.log(activities);
    console.log(userSymptoms);
    console.log(userLocation);
    console.log(entryDate);

    $("div").append("<tr><td>" + user + "</td><td>" + userActivities + "</td><td>" +
        userSymptoms + "</td><td>" + userLocation + "</td><td>" + entryDate + "</td><td>"
    );

});


$("#sign-out").on('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut();
});
}