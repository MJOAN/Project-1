// Firebase web API key: AIzaSyAA1EgZPbbAMpIzWeVVtodHCqSjHy-G14c
// Firebase project ID: project-1-7c513
// var database = new Firebase('https://project-1-7c513.firebaseio.com');

      (function($) {
            'use strict';
    var config = {
        apiKey: "AIzaSyAA1EgZPbbAMpIzWeVVtodHCqSjHy-G14c",
        authDomain: "project-1-7c513.firebaseapp.com",
        databaseURL: "https://project-1-7c513.firebaseio.com",
        projectId: "project-1-7c513",
        storageBucket: "project-1-7c513.appspot.com",
        messagingSenderId: "173560237058"
    };
    // this is code for google/email provider auth sign-in
    firebase.initializeApp(config);

    var database = firebase.database().ref();

   $("#userinput-form", "button").on("click", function(event) {
    event.preventDeafault();

    var user = user.uid;
    var userActivities = $("#activities").val().trim();
    var userSymptoms = $("#symptoms").val().trim();
    var userLocation = $("#location").val().trim();
    var entryDate = moment($("#entry-date").val().trim(), "DD/MM/YY").format("X");

    var user = {
        activities: userActivities,
        symptoms: userSymptoms,
        location: userLocation,
        entry: entryDate
    };

    // .key()
    userObject.push(user).then(function() {
    }).catch(function(error) {
    });

    console.log(user.name);
    console.log(user.activities);
    console.log(user.symptoms);
    console.log(user.location);
    console.log(user.entry);

    // clear form after initialize
    $("#name").val("");
    $("#activities").val("");
    $("#symptoms").val("");
    $("#location").val("");
    $("#entry-date").val("");
});

    database.once("child_added", function(childSnapshot, prevChildKey) {
    // console.log("added", snap.key(), snap.val());
    console.log(childSnapshot.val());

    var user = childSnapshot.val().name;
    var userActivities = childSnapshot.val().activities;
    var userSymptoms = childSnapshot.val().symptoms;
    var userLocation = childSnapshot.val().location;
    var entryDate = childSnapshot.val().entry;

    console.log(user);
    console.log(userActivities);
    console.log(userSymptoms);
    console.log(userLocation);
    console.log(entryDate);

    $("#table > tbody").append("<tr><td>" + user + "</td><td>" + userActivities + "</td><td>" +
        userSymptoms + "</td><td>" + userLocation + "</td><td>" + entryDate + "</td><td>"
    );

});
})(jQuery);