
  var config = {
    apiKey: "AIzaSyAA1EgZPbbAMpIzWeVVtodHCqSjHy-G14c",
    authDomain: "project-1-7c513.firebaseapp.com",
    databaseURL: "https://project-1-7c513.firebaseio.com",
    projectId: "project-1-7c513",
    storageBucket: "project-1-7c513.appspot.com",
    messagingSenderId: "173560237058"
  };
  firebase.initializeApp(config);


var auth = firebase.auth();
provider.addScope('profile');
provider.addScope('email');
provider.addScope('https://www.googleapis.com/auth/plus.login');
var logIn = $("#log-in");
var signOut = $("#sign-out");
var displayName;
var currentUID = firebase.auth().currentUser.uid;
var user = firebase.auth().currentUser;


// modal log in buttons email & google

var uiConfig = {
        signInSuccessUrl: 'index.html',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ],
      };

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#login-app", uiConfig);

// login user

logIn.on("click", function(event) {

    auth.signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        $("#logIn").modal("hide");
        console.log("Hi, " + user.displayName)
        console.log("Registration Completed." + "UID is: " + currentUID.uid);
        console.log(user.displayName);
    }).catch(function (error) {
        console.log(error);
})


signOut.on("click", function(event) {

    auth.signOut().then(function() {
        console.log('Signed Out');
        $("#logOut").modal("hide");
    }, function(error) {
        console.error('Sign Out Error', error);
    });
});


auth.onAuthStateChanged(function(user) {
    window.user = user;
    var name, email, photoUrl, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      currentUID = user.uid;  //authenticate with User.getToken()
    }

    if (user) {
        console.log(currentUID);
        if (user && user.uid != currentUID) {
            console.log("Welcome! User UID:" + currentUID);
        } else {
            currentUID = null;
            console.log("No user signed in.")
            window.location.assign("login.html")
        }
    };
});
});




