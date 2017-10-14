      var uiConfig = {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        };
    ],
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#login-app", uiConfig);



            var todaysDate = "10-10-2017";

            console.log("im being clicked");
            var userLocation = $("#location").val().trim(); // this could tie to GOOGLE MAPS API
            var userComment = $("#comments").val().trim();
            var uIDRef = usersRef.child(currentUID);
            var uIDRefName = uIDRef.child("name");
            var entryDate = moment($("#entry-date").val().trim(), "DD/MM/YY").format("X");
            console.log(userLocation);
            console.log(userComment);
            $.ajax({
                    url: "https://api.wunderground.com/api/f8b3b3389929c977/history_20170929/q/CA/Los_Angeles.json",
                    method: "GET"
                })
                .done(function(response) {
                    usersRef.child(currentUID).child(todaysDate).update({
                        syncedEntries: {
                            weather: {
                                highTemp: response.history.dailysummary[0].maxtempi,
                                lowTemp: response.history.dailysummary[0].mintempi,
                            }
                        }
                    })
                });
 
           usersRef.child(currentUID).update({
                [todaysDate]: {
                    manualEntries: {
                        location: userLocation,
                        comment: userComment,
                    }
                }
            });
            };
            console.log("Welcome UID:" + currentUID);

            usersRef.child(currentUID).set({ 
                name: userName,

            });
            // window.location.assign("index.html")  //not working
            }
            else {
                currentUID = null;
                console.log("no user signed in");
            }
            };

            };