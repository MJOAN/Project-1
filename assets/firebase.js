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


$("#click-button").on("click", function(event) {
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


