'use strict';

var database = firebase.database();
var usersRef = database.ref("users");
var currentUID = firebase.auth().currentUser;
/*var uIDRef = usersRef.child(currentUID);
var uIDRefName = uIDRef.child("Name");*/
var syncedEntries;

// use moment library for today

var todaysDate = moment($("#entry-date").val(), "DD/MM/YY").format("X");


    var url = window.location.href;
    console.log(url);
    //access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    // get userid
    var userId = url.split("#")[1].split("=")[2].split("&")[0];
    $.ajax({
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'Bearer ' + access_token);
        },
        url: "https://api.fitbit.com/1/user/" + userId + "/activities/steps/date/today/1w.json",
        success: function(data, status, xhr) {
            console.log(JSON.stringify(data));
        }
    });

    $.ajax({
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'Bearer ' + access_token);
        },
        url: "https://api.fitbit.com/1/user/" + userId + "/activities/heart/date/today/1w.json",
        success: function(data, status, xhr) {
            console.log(JSON.stringify(data));
        }
    });
    $.ajax({
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'Bearer ' + access_token);
        },
        url: "https://api.fitbit.com/1/user/" + userId + "/sleep/date/2017-04-02.json",
        success: function(data, status, xhr) {
            console.log(JSON.stringify(data.summary.totalMinutesAsleep));
            console.log(JSON.stringify(data.summary.totalTimeInBed));
        }
    });


    // weather API one - grabbing info by user input
    $.ajax({
            url: "https://api.wunderground.com/api/f8b3b3389929c977/history_20170929/q/CA/Los_Angeles.json",
            method: "GET"
        })
        .done(function(response) {
            $("#fitBitDisplay").html("Max Temp " + JSON.stringify(response.history.dailysummary[0].maxtempi));
            console.log("Min Temp " + JSON.stringify(response.history.dailysummary[0].mintempi));
            console.log("Max Hum " + JSON.stringify(response.history.dailysummary[0].maxhumidity));
            console.log("Min Hum " + JSON.stringify(response.history.dailysummary[0].minhumidity));
            console.log("Mean Wind Speed " + JSON.stringify(response.history.dailysummary[0].meanwindspdi));
            console.log("Rainfall " + JSON.stringify(response.history.observations[0].rain));
        });

    // weather API two - grabbing info by user's IP address
    // working link - http://api.wunderground.com/api/f8b3b3389929c977/history_20170929/geolookup/q/autoip.json

            usersRef.child(currentUID).child(todaysDate).update({
                syncedEntries: {
                    weather: {
                        highTemp: response.history.dailysummary[0].maxtempi,
                        lowTemp: response.history.dailysummary[0].mintempi
                    }
                    /*fitBitDisplay: restingHeartRate: "59",*/
                }
            });

            console.log(userRef.syncedEntries.weather.highTemp);
            console.log(userRef.syncedEntries.weather.lowTemp);


    var weatherQueryURL = "https://api.wunderground.com/api/f8b3b3389929c977/history_" 
    + todaysDate + "/geolookup/q/autoip.json";

    $.ajax({
            url: weatherQueryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log("Geo Max Temp " + JSON.stringify(response.history.dailysummary[0].maxtempi));
            console.log("Geo Min Temp " + JSON.stringify(response.history.dailysummary[0].mintempi));
            console.log("Geo Max Hum " + JSON.stringify(response.history.dailysummary[0].maxhumidity));
            console.log("Geo Min Hum " + JSON.stringify(response.history.dailysummary[0].minhumidity));
            console.log("Geo Mean Wind Speed " + JSON.stringify(response.history.dailysummary[0].meanwindspdi));
            console.log("Geo Rainfall " + JSON.stringify(response.history.observations[0].rain));
        });

            usersRef.child(currentUID).child(todaysDate).update({
                syncedEntries: {
                    weather: {
                        highTemp: response.history.dailysummary[0].maxtempi,
                        lowTemp: response.history.dailysummary[0].mintempi
                }
            }
            });

    var aqiURL = "https://api.waqi.info/feed/here/?token=593a9ac142943ace1b66178b02174bd1671dd07f";

    // AQI
    $.ajax({
            url: aqiURL,
            method: "GET"
        })
        // the url above grabs the user's ip's address to determine its location
        // basic url - "http://api.waqi.info/search/?token=593a9ac142943ace1b66178b02174bd1671dd07f&keyword=losangeles"
        .done(function(response) {
            console.log("AQI " + JSON.stringify(response.data.aqi));
            // basic - console.log("AQI " + response.data[0].aqi);  
        });

            usersRef.child(currentUID).child(todaysDate).update({
                syncedEntries: {
                    weather: {
                        highTemp: response.history.dailysummary[0].maxtempi,
                        lowTemp: response.history.dailysummary[0].mintempi
            }
        }
    });









