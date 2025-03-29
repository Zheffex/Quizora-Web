<?
// quizora_api/public/web/php/login.php

// Include session functions
include_once __DIR__ . '/functions/session.php';

// Check if user is already logged in
if (checkAuth()) {
    header("Location: homepage.php"); // Redirect to homepage if already logged in
    exit();
}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login.css">
    <title>Quizora Login</title>
</head>
<body>
    <header class="header">
        <h1 class="logo">QUIZORA</h1>
        <div class="auth-buttons">
            <a href="signup.php" class="signup">Sign up</a>
        </div>
    </header>
    
    <div class="login-container">
        <div class="login-box">
            <div class="illustration">
                <img src="../media/img/login.png" alt="Login Illustration">
            </div>
            <div class="login-form">
                <h2>Welcome!</h2>
                <p>Sign in to your account</p>
                <input type="email" id="login-email" placeholder="Email Address" class="input-field">
                <input type="password" id="login-password" placeholder="Password" class="input-field">
                <a href="forgotpassword.php" class="forgot-password">Forgot Password?</a>
                <button type="button" class="login-button" onclick="login()">LOGIN</button>
                <p class="signup-prompt">Don't have an account? <a href="signup.php" class="signup-link">Sign up</a></p>
            </div>
        </div>
    </div>

    
    <script src="../js/login.js"></script>
</body>
</html>