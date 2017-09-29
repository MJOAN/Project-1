var = { // firebase CODE 

};
  
  firebase.initialApp(config);

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

    // 
    var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // how much time passed in seconds then convert into months
    // 
    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(empMonths);

    var empBilled = empMonths + empRate;
    console.log(empBilled)


    // showing this to HTML; 
    $("#employe-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" 
      + empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "
    });

// initlaize FB, set var to DB, then get variables, store data in vars, 
// submit them to DB, then display 

    };