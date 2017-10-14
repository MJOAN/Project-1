var config = {
    apiKey: "AIzaSyAA1EgZPbbAMpIzWeVVtodHCqSjHy-G14c",
    authDomain: "project-1-7c513.firebaseapp.com",
    databaseURL: "https://project-1-7c513.firebaseio.com",
    projectId: "project-1-7c513",
    storageBucket: "project-1-7c513.appspot.com",
    messagingSenderId: "173560237058"
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.addScope('https://www.googleapis.com/auth/plus.login');

function signInGoogle() {
    firebase.auth().signInWithPopup(provider)
    console.log("this is firebase user " + displayName)
    console.log("Registration Completed." + " uid is " + currentUID);
},
function(error) {
    console.error("Signing in error", error);
};


$("#login").submit(function(event) {
    signInGoogle();
});

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign out error', error);
    });
}

$("#sign-out").submit(function(event) {
    signOut();
};

var startAuthServerRegister = function() { // check state of user auth; otherwise send to log in.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.uid != currentUID) {
            console.log("Welcome UID:" + currentUID);
            console.log(user)
        } else {
            window.location.assign("login.html")
        }
    });
}


var startAuthListenerLogIn = function() { // if user signed in and in firebase, go to main, if no got to register.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref(`users/${user.uid}`).on('value', function(snap) {
                if (snap.val()) {
                    currentUID = user.uid;
                    console.log("Welcome UID:" + currentUID);
                    window.location.assign("index.html")
                } else {
                    console.log(user)
                    console.log("No user signed in.");
                    window.location.assign("register.html");
                }
            })
        }
    });
};

var startAuthListenerMain = function() { // if user signed in and in not in firebase go to register, if not, go to log in.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref(`users/${user.uid}`).on('value', function(snap) {
                if (!snap.val()) {
                    currentUID = user.uid;
                    console.log("Welcome UID:" + currentUID);
                    window.location.assign("register.html")
                }
            })
        } else {
            window.location.assign("login.html")
        }
    });
};