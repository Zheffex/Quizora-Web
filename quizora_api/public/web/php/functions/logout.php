<?php
// quizora_api/public/web/php/signup.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/signup.css">
    <title>Quizora Signup</title>
</head>
<body>
    <header class="header">
        <h1 class="logo">QUIZORA</h1>
        <div class="auth-buttons">
            <a href="login.php" class="login">Login</a>
        </div>
    </header>
    
    <div class="signup-container">
        <div class="signup-box">
            <div class="illustration">
                <img src="../media/img/login.png" alt="Signup Illustration">
            </div>
            <div class="signup-form">
                <h2>Welcome!</h2>
                <p>Create your account</p>
                <input type="text" id="full-name" placeholder="Full Name" class="input-field">
                <input type="email" id="email" placeholder="Email Address" class="input-field">
                <input type="password" id="password" placeholder="Password" class="input-field">
                <input type="password" id="confirm-password" placeholder="Confirm Password" class="input-field">
                <button type="button" class="signup-button" onclick="signUp()">SIGN UP</button>
                <p class="login-prompt">Already have an account? <a href="login.php" class="login-link">Login</a></p>
            </div>
        </div>
    </div>

    <script src="../js/signup.js"></script>
</body>
</html>
