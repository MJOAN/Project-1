var config = {
    apiKey: "AIzaSyAA1EgZPbbAMpIzWeVVtodHCqSjHy-G14c",
    authDomain: "project-1-7c513.firebaseapp.com",
    databaseURL: "https://project-1-7c513.firebaseio.com",
    projectId: "project-1-7c513",
    storageBucket: "project-1-7c513.appspot.com",
    messagingSenderId: "173560237058"
};

firebase.initializeApp(config);

var startAuthServerRegister = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.uid != currentUID) {
            console.log("Welcome UID:" + currentUID);
            console.log(user)
        } else {
            window.location.assign("login.html")
        }
    });
}


var startAuthListenerLogIn = function() {
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

var startAuthListenerMain = function() {
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