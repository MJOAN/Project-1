
var database = firebase.database().ref();

$("#input-form").submit(function(event) {
    event.preventDeafault();
    console.log("hit");

    var user = firebase.auth().currentUser;
    
    var activities = $("#activities").val();
    var symptoms = $("#symptoms").val();
    var alcohol = $("#alcohol").val();
    var location = $("#location").val().trim();
    var comments = $("#comments").val().trim();

    console.log(location, "hit");


    database.ref(`users/` + user.uid + `/form`).set({
        activities: activities,
        symptoms: symptoms,
        location: location,
        alcohol: alcohol,
        comment: comments

    }).then(function(data) {
        console.log(activities);
         console.log("hit");
    })

/*  console.log(user.activities);
    console.log(user.symptoms);
    console.log(user.location);
    console.log(user.comments);
    console.log(user.alcohol);*/

    $("#activities").val("");
    $("#symptoms").val("");
    $("#location").val("");
    $("#alcohol").val("");
    $("#comments").val("");
});


database.once("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var activities = childSnapshot.val().activities;
    var symptoms = childSnapshot.val().symptoms;
    var location = childSnapshot.val().location;
    var alcohol = childSnapshot.val().alcohol;
    var comments = childSnapshot.val().comments;

    console.log(activities);
    console.log(location);
    console.log(symptoms);
    console.log(alcohol);
    console.log(comments);
    
        $("results").append("<tr><td>" + comments + "</td><td>" + activities + "</td><td>" +
            location + "</td><td>" + symptoms + "</td><td>" + alcohol + "</td><td>"
        );
    });
