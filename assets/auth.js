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
var register = $("#register-app");
var logIn = $("#log-in");
var logOut = $("#log-out");
var displayName; 
var currentUID = firebase.auth().currentUser;


var uiConfig = {

    callbacks: {
        signInSuccess: function(user, credential, redirectUrl) {
            if (user) {
            console.log(user);
            } else {
             console.log("Please register by clicking sign in.")
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
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        },
    ],
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#login-app", uiConfig);

// register user & set fire

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
    }).catch(function(error) {

        console.log(error);
    })

logOut.on("click", function(event) {
    event.preventDefault();
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
            currentUID = user.uid; //authenticate with User.getToken()
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



