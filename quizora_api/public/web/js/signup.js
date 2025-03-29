// quizora_api/public/web/js/signup.js
console.log('Signup JS Loaded');

function signUp() {
    console.log('Button clicked');

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Prepare data to send
    const data = {
        username: fullName,
        email: email,
        password: password,
    };

    // Log the data to verify it's correct
    console.log('Signup data:', data);

    // Send POST request to API for signup
    fetch('/quizora_api/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log('Signup Response:', responseData);

        if (responseData.success) {
            // Redirect to login page if signup is successful
            window.location.href = 'login.php';
        } else {
            alert('Signup failed: ' + responseData.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during signup');
    });
}
