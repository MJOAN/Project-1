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
        var userRef = database.ref("users");
        var name = "";
        var currentUID = firebase.auth().currentUser;
        var age = "";
        var email = "";
        var password = "";

        startAuthServerRegister();

        $("#register-form").submit(function(event) {

            event.preventDefault();

            name = $("#name").val().trim();
            age = $("#age").val().trim();
            var user = firebase.auth().currentUser;

            userRef.child(currentUID).set({
                name: name,
                age: age,
            }).then(function(data) {
                console.log(data);
                window.location.assign("index.html");
            })

        });
