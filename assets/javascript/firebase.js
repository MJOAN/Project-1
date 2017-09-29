
  // Initialize Firebase
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

  ("#add-user-data-btn").on("click", function(event) {
    event.preventDeafault();

    var userName = $("#user-name").val().trim();
    var userAge =$("#age").val().trim();
    var userLocation = $("#location").val().trim();   // this could tie to GOOGLE MAPS API
    var entryDate = moment($("#entry-date").val().trim(), "DD/MM/YY").format("X");


    var userData = {
      name: userName,
      age: userAge,
      location: userLocation,
      entry: entryDate
    };

    database.ref().push(userData);

    console.log(userData.name);
    console.log(userData.age);
    console.log(userData.location);
    console.log(userData.entry);

    alert("User data successfully added");

    $("#name").val("");
    $("#age").val("");
    $("#location").val("");
    $("#entry-date").val("");
  });

  // referencing group on data base listening for when you push new item in database with two parameters
  // have to do console log to see .val can't read what it is in HTML 
  // .val turns it in to an object you can see then pulling in var name into the object; 
  // child added is predefined! 

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val());

      //everytime data is added it gets stored as a var !!!

      var userName = childSnapshot.val().name;
      var userAge = childSnapshot.val().age;
      var userLocation = childSnapshot.val().location;
      var entryDate = childSnapshot.val().entry;

      console.log(userName);
      console.log(userAge);
      console.log(userLocation);
      console.log(entryDate);
    })    
    // moment is a library
    var empStartPretty = moment.unix(entryDate).format("MM/DD/YY");

    // showing this to HTML; 
    $("#table > tbody").append("<tr><td>" + userName + "</td><td>" + userAge + "</td><td>" 
      + empStartPretty + "</td><td>" + userLocation + "</td><td>" + entryDate + "</td><td>"
    });

// initlaize FB, set var to DB, then get variables, store data in vars, 
// submit them to DB, then display 

    };