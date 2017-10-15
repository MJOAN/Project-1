// tw API key: 	D74yfbE994IArLpefWURaI3Kt
// tw secret: Liig8l7dRJnemYqvKvlIPM0fG5rtOomjBaQj1Q1JR02BIFTQdC
// tw access token: 919642726987001856-g6ubOBnjDm8nmeFQqBSIKqgQioKFlMu
// tw token secret: pkbwUJDGx0QdUOJzd1ZRjjeHWCiLWPbAU6g9VrT4sVw1b



var auth = firebase.auth();
var register = $("#register-app");
var logIn = $("#log-in");
var logOut = $("#log-out");
var displayName;
var currentUID = firebase.auth().currentUser;


auth.onAuthStateChanged(function(user) {
    window.user = user;
    var name, email, photoUrl, currentUID;

    if (user) {
    	name = user.displayName;
        email = user.email;
        photoUrl = user.photoUrl;
        currentUID = user.uid; //authenticate with User.getToken()
        console.log("Welcome! " + name, "and UID:" + currentUIDname);
    } else {
        currentUID = null;
        console.log("No user signed in.")
        window.location.assign("login.html")
        }
    };
});


// facebook



  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  FB.init({
    appId      : '<YOUR_FACEBOOK_APP_ID>',
    status     : true,
    xfbml      : true,
    version    : 'v2.6'
  });

FB.Event.subscribe('auth.authResponseChange', checkLoginState);

FB.getLoginStatus(checkLoginStatus);
 function authUser() {
FB.login(checkLoginStatus, {scope:'email'});
}

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }


function checkLoginState(event) {
    if (event.authResponse) {
        var unsubscribe = auth.onAuthStateChanged(function(currentUID) {
            unsubscribe();
    if (!isUserEqual(event.authResponse, currentUID)) {

        var credential = firebase.auth.FacebookAuthProvider.credential(
            event.authResponse.accessToken);

        auth.signInWithCredential(credential).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different provider for that email.');
            window.location.assign("index.html")
        } else {
            console.error(error);
            auth.signOut();
        }
    }


function authUser(user) {
    user = window.user
    if (user) {
        var providerData = user.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                providerData[i].uid === facebookAuthResponse.userID) {
                return true;
            }
        }
    }
	return false;
}










