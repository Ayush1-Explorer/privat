const signInBtnlink = document.querySelector('.signInBtn-link');
const signUpBtnlink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

// Toggle active class when clicking on "Sign Up" or "Log In" links
signUpBtnlink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnlink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

// Function to handle successful sign-in
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    
    // Retrieve user details
    var id = profile.getId();
    var name = profile.getName();
    var email = profile.getEmail();
    var imageUrl = profile.getImageUrl();

    // Save the login details (you can save it to localStorage, sessionStorage, or send it to the server)
    localStorage.setItem('googleUserId', id);
    localStorage.setItem('googleUserName', name);
    localStorage.setItem('googleUserEmail', email);
    localStorage.setItem('googleUserProfileImage', imageUrl);
    
    // Redirect to index.html
    window.location.href = 'index.html';
}

// Function to close the form (if needed)
function closeForm() {
    // Assuming your home page URL is "/"
    window.location.href = "/index.html";
}


// function onSuccess(googleUser) {
//     // Handle successful sign-in
//     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//     // Add your logic here
//   }
  
//   function onFailure(error) {
//     // Handle sign-in failure
//     console.log('Sign-in failed: ' + error);
//   }
  
//   function signInWithGoogle() {
//     gapi.auth2.getAuthInstance().signIn().then(onSuccess, onFailure);
//   }
  
//   function renderButton() {
//     gapi.signin2.render('googleSignIn', {
//       'scope': 'profile email',
//       'width': 200,
//       'height': 30,
//       'longtitle': true,
//       'theme': 'dark',
//       'onsuccess': onSuccess,
//       'onfailure': onFailure
//     });
//   }
  
//   // Load the Google API platform library
//   function handleClientLoad() {
//     gapi.load('auth2', initAuth);
//   }
  
//   function initAuth() {
//     gapi.auth2.init({
//       client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
//       // Add additional configuration here if needed
//     }).then(renderButton);
//   }
  
//   // Call handleClientLoad to initiate loading the Google API library
//   handleClientLoad();
  
