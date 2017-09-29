
    // VARIABLES: 
    //__________________________________________________________________________________________
    // FUNCTIONS: 
    //__________________________________________________________________________________________
   
    // MAIN PROCESS:
    //__________________________________________________________________________________________



    // API/AJAX: 
    //__________________________________________________________________________________________

    var variable = "";
    var queryURL = "https://www." + variable + "";

    $.ajax({
      url: queryURL,
      method: "GET"
    }) .done(function(response) {



    // CODE: Second API button onclick()  
    //__________________________________________________________________________________________

    $("button").on("click", function() {
      var firstAPI = $(this).attr("");
      var queryURL = "http://" + firstAPI + "&api_key=";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

        console.log(response);

