document.addEventListener("DOMContentLoaded", function(event) {
console.log("ready!");

/*
S T A T E Facebook Credentials: 
// API Key: 180500585843587
// Secret: 9ae3f80d7bc65471a7fe428c3dfad539
*/

var auth = firebase.auth();
var displayName;
var currentUID = firebase.auth().currentUser;

// facebook developer code

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    if (response.status === 'connected') {
        testAPI();
    } else {
        console.log("Error signing in with Facebook.")
        window.location.assign("login.html")
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// this is our API key 

FB.init({
    appId: '180500585843587',
    status: true,
    xfbml: true,
    version: 'v2.10'
});

FB.Event.subscribe('auth.authResponseChange', checkLoginState);
FB.getLoginStatus(checkLoginStatus);

function authUser() {
FB.login(checkLoginStatus, { scope: 'email' });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


    // simple test of the Graph API after login is successful
    // view  statusChangeCallback() for docs

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

    // this code checks for re-authentication

FB.login(function(response) {}, { auth_type: 'reauthenticate' })


function checkNonce(access_token) {
    $.post('checkNonce.php', { access_token: access_token }, function(data) {
        if (data == 1) {
            console.log('The user has been successfully re-authenticated.');
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
            });
        } else {
            console.log('The nonce has been used before. Re-authentication failed.');
        }
    });
}

// this code checks log in state with token

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
                    } else {
                        console.error(error);
                        auth.signOut();
                    }
                });
            }
        })
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

});