document.addEventListener("DOMContentLoaded", function(event) {
    console.log( "ready!" );

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
var displayName, manualEntries, currentUser;

var register = $("#register-app");  // form div where user registers - submit function
var logInModal = $("#logIn");   
var logOutModal = $("#logOut");
var logOutBtn = $("#logout-btn");  
var logInBtn = $("#login-btn");   



var uiConfig = {
    callbacks: {
      signInSuccess: function(currentUser, credential, redirectUrl) {
        console.log(currentUser);
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
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
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in the Sign Up page.
        requireDisplayName: true
      },
    ],
  };

  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#login-app", uiConfig);
  console.log(currentUser);




var currentUID = null;
var initApp = function(event) {
    auth.onAuthStateChanged(function(user) {
        user = window.user;
        var name, email, photoUrl, currentUID;

        if (user) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoUrl;
            currentUID = user.uid; 
            console.log(name, email, currentUID);
        }

        if (user && user.uid != currentUID) {
            console.log("Welcome UID:" + currentUID);
        } else {
            currentUID = null;
            console.log("No user signed in.")
            window.location.assign("login.html")

            }
        });
    };


// register, log or logout & set fire

register.submit("click", function(event) {
    event.preventDefault();
    displayName = $("#name").val().trim();
    age = $("#age").val().trim();
    
    usersRef.child(currentUID).set({
        name: displayName,
        age: age
    });
    $("#register").modal("hide");
});

logInBtn.on("click", function(event) {
    event.preventDefault();
    auth.signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        logInModal.modal("hide");
        console.log("Hi, " + user.displayName)
        console.log("Registration Completed. Your UID is: " + user.uid);
    // do i want to push to firebase here?  - logging in a new day?! 

    }).catch(function(error) {
        console.log(error);
    })
});

logOutBtn.on("click", "button", function(event) {
    event.preventDefault();
    auth.signOut().then(function() {
        console.log('Signed Out');
        logOutModal.modal("hide");
        window.location.replace("index.html");
    }, function(error) {
        console.error('Sign Out Error', error);
    });
});
});

