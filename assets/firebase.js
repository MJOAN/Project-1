var config = {
    apiKey: "AIzaSyAA1EgZPbbAMpIzWeVVtodHCqSjHy-G14c",
    authDomain: "project-1-7c513.firebaseapp.com",
    databaseURL: "https://project-1-7c513.firebaseio.com",
    projectId: "project-1-7c513",
    storageBucket: "project-1-7c513.appspot.com",
    messagingSenderId: "173560237058"
};
firebase.initializeApp(config);

var database = firebase.database();
var usersRef = database.ref("users");
var currentUID = firebase.auth().currentUser;
var auth = firebase.auth();
var displayName, manualEntries;

var comments = "";
var location = "";
var inputForm = $("#input-form");

var respitory, digestive, neurological,
    malaise, comments, alcohol, noExercise,
    lightExercise, modExercise, heavyExercise;


// input form

inputForm.on("click", "#add-user-data-btn", function(event) {
    console.log("solo");

    var datesInArray = [];
    var activitiesInArray = [];
    var symptomsInArray = [];
    var weatherInArray = [];
    var hrInArray = [];
    var UIDRef = usersRef.child(currentUID);

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
                activitiesInArray: [noExercise, lightExercise, modExercise, heavyExercise],
                symptomsInArray: [respitory, digestive, neurological, malaise],
                location: location,
                alcohol: alcohol,
                comment: comments
            }
        }
    });

    console.log(todaysDate.manualEntries.activitiesInArray[0]);
    console.log(location);
    console.log(comment);
});


    // nicole's logic for symptoms/days/activities

/*    UIDRef.orderByKey().on("child_added", function(snapshot) {
        // for (var values in snapshot.val()) {
        // }
        datesInArray.push(snapshot.key);
        symptomsInArray.push(JSON.stringify(snapshot.val()));
        // symptomsInArray.push(JSON.stringify(snapshot.val().manualEntries.symptoms));
        weatherInArray.push(JSON.stringify(snapshot.val().syncedEntries.weather.highTemp));
        hrInArray.push(JSON.stringify(snapshot.val().syncedEntries.fitbit.restingHR));
        // console.log("sleepInArray one " + sleepInArray); 
    });

    UIDRef.on("value", function(snapshot) {
        // console.log("datesInArray " + datesInArray);
        // console.log("symptomsInArray " + symptomsInArray);
        // console.log("weatherInArray " + weatherInArray);
        // console.log("hrInArray " + hrInArray);            
        var experiencedBefore = [];
        var historicalHighTemp = [];
        var highHR = [];
        console.log("number of children " + snapshot.numChildren());


        if (symptomsInArray.length === snapshot.numChildren()) {
            for (var i = 0; i < symptomsInArray.length; i++) {
                if (symptomsInArray[symptomsInArray.length - 1] === symptomsInArray[i]) {
                    experiencedBefore.push(datesInArray[i]);
                    historicalHighTemp.push(historicalHighTemp[i]);
                    if (highHR[i] > 65) {
                        highHR.push(hrInArray[i]);
                    }
                }
            }

            console.log("You have experienced this symptom on " + experiencedBefore + " and the high temp was " + historicalHighTemp);
            console.log("On " + highHR.length + " of those days, your resting HR was higher than  65");
        
    };
});

*/
/*    // Handle the errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });
*/
