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

var register = $("#register-app");
var logIn = $("#log-in");
var logOut = $("#log-out");
var displayName; 


auth.onAuthStateChanged(function(user) {
    user = window.user;
    var name, email, photoUrl, currentUID;

    if (user) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoUrl;
        currentUID = user.uid; 
        console.log("Welcome! " + name, "and UID:" + currentUID);
    } else {
        currentUID != user;
        console.log("No user signed in.")
        window.location.assign("index.html")
        }
    });

var uiConfig = {

    callbacks: {
        signInSuccess: function(user, credential, redirectUrl) {
            if (user) {
            console.log(user);
            } else {
             console.log("Please register by clicking sign up.")
            }
        },
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    queryParameterForWidgetMode: 'mode',
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#login-app", uiConfig);


// register, log or logout & set fire

register.on("click", function(event) {
    event.preventDefault();
    displayName = $("#name").val().trim();
    age = $("#age").val().trim();
    
    usersRef.child(currentUID).set({
        name: displayName,
        age: age
    });
    $("#register").modal("hide");
});

logIn.on("click", function(event) {
    event.preventDefault();
    auth.signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        $("#logIn").modal("hide");
        console.log("Hi, " + user.displayName)
        console.log("Registration Completed." + "UID is: " + user.uid);
    // do i want to push to firebase here?  - logging in a new day?! 

    }).catch(function(error) {
        console.log(error);
    })

logOut.on("click", function(event) {
    event.preventDefault();
    auth.signOut().then(function() {
        console.log('Signed Out');
        $("#logOut").modal("hide");
        window.location.replace("index.html");
    }, function(error) {
        console.error('Sign Out Error', error);
    });
});
});




