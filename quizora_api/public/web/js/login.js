// quizora_api/public/web/js/login.js

console.log('Login JS Loaded'); // Checking if js has been loaded

// Prevent going back to the previous page after logging out
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.pushState(null, null, window.location.href);
};

window.onload = function() {
    // Check if the user is logged in via the session
    fetch('/quizora_api/api/users/status', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            window.location.href = 'homepage.php'; // If logged in, redirect
        }
    });
};

function login() {
    console.log('Button clicked');

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Prepare data to send
    const data = {
        email: email,
        password: password
    };

    // Log the data to verify it's correct
    console.log('Login data:', data);

    // Send POST request to API for login
    fetch('/quizora_api/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log('Login Response:', responseData);

        if (responseData.success) {
            // Redirect to the homepage after successful login
            window.location.href = 'homepage.php';  // Change this to wherever you'd like the user to go
        } else {
            alert('Login failed: ' + responseData.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during login');
    });
}





