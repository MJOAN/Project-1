var database = firebase.database();
var usersRef = database.ref("users");

var todaysDate = [];
var manualEntries;

var currentUID = firebase.auth().currentUser;
var displayName = "";
var age = "";
var email = "";
var password = "";
var comments = "";
var location = "";

var inputForm = $("#input-form");
var registerForm = $("#register-app");
var loginForm = $("#login-app");

var respitory, digestive, neurological,
    malaise, comments, alcohol, noExercise,
    lightExercise, modExercise, heavyExercise;


// register user

$(document).on("click", "register-button", function(event) {
    event.preventDefault();

    displayName = $("#name").val().trim();
    age = $("#age").val().trim();
    email = $("#email").val().trim();
    password = $("#password").val().trim();

    usersRef.child(currentUID).set({
        name: displayName,
        age: age
    });
});

// input form

$(document).on("click", "#add-user-data-btn", function(event) {

    var location = $("#location").val().trim();
    var comments = $("#comments").val().trim();

    var respitory = $("input[type=checkbox][name=respitory]:checked").val();
    var digestive = $("input[type=checkbox][name=digestive]:checked").val();
    var neurological = $("input[type=checkbox][name=neurological]:checked").val();
    var malaise = $("input[type=checkbox][name=malaise]:checked").val();
    var alcohol = $("input[type=checkbox][name=alcohol]:checked").val();

    var noExercise = $("input[type=radio][name=no-exercise]:checked").val();
    var lightExercise = $("input[type=radio][name=light-exercise]:checked").val();
    var modExercise = $("input[type=radio][name=mod-exercise]:checked").val();
    var heavyExercise = $("input[type=radio][name=heavy-exercise]:checked").val();

    console.log("Your location today was: ", location);
    console.log(currentUID);

    usersRef.child(currentUID).update({
        [todaysDate]: {
            manualEntries: {
                activities: [noExercise, lightExercise, modExercise, heavyExercise],
                symptoms: [respitory, digestive, neurological, malaise],
                location: location,
                alcohol: alcohol,
                comment: comments
            }
        }
    });

    console.log(currentUID.todaysDate.manualEntries.activities[0]);
    console.log(currentUID.todaysDate.manualEntries.symptoms[0]);
    console.log(currentUID.todaysDate.manualEntries.comments);



    database.ref().on("value", function(snapshot) {

        console.log(snapshot.val().displayName);
        console.log(snapshot.val().activities);
        console.log(snapshot.val().location);
        console.log(snapshot.val().comments);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});


