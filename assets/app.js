$(document).ready(function() {

            var uiConfig = {

                signInSuccessUrl: "index.html",
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
            };

            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start("#login-app", uiConfig);

            function registerUser(uid, userObj, cb) {
                var ref = firebase.database().ref(`users`)
                ref.once("value", function(snapshot) {

                    var users = snapshot.val();
                    users[uid] = userData;
                    ref.set(users, cb);
                })
                window.location.replace("register.html");
            };

            // Jonathan assisted here: using .serialize() puts entire form data into an array 
            // then we return that array 

            function objectifyForm(formArray) { //serialize data function
                var returnArray = {};
                for (var i = 0; i < formArray.length; i++) {
                    returnArray[formArray[i]['name']] = formArray[i]['value'];
                }
                return returnArray;
            }();

            // this is verifying user has an email address registered
            // we get user UID unique get value from snapshot and if/else verify 
            // if they don't have 

            function getUser(uid) {
                var ref = firebase.database().ref(`users/${uid}`)
                ref.once("value", function(snapshot) {
                    console.log('User is: ', snapshot.val());
                    if (snapshot.val()) {
                        window.location.href = "/";
                    } else {
                        window.location.href = "/register.html"
                    }
                })
                getUser(user.uid);
            }


            $("#register-btn").on("submit", function(event) {
                var user = firebase.auth().currentUser;
                var userData = objectifyForm($(this).serializeArray())
                registerUser(user.uid, userData, function() {

                });

                firebase.auth().createUserWithEmailAndPassword(email, password)
                window.location.href = "login.html"
                    .catch(function(error) {
                        console.log(error);
                    });


            $("#sign-out").on("submit", function(event) {
                firebase.auth().signOut().then(function() {}).catch(function(error) {})
            });


                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        console.log(userData)
                    }
                }, function(error) {
                    console.log(error);
                });
            });

            /*    var initApp = function(user) {
                        window.user = user;
                        firebase.auth().onAuthStateChanged(function(user) {
                            console.log(user);

                            var displayName = user.displayName;
                            var email = user.email;
                            var uid = user.uid;
                            var providerData = user.providerData;
                            if (window.user) {
                                window.location.assign("index.html")
                            }
                        });
                    };*/