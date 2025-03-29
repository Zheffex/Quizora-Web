<?php
// quizora_api/public/web/php/functions/session.php

session_start();  // Start session at the beginning of every script that needs session management

// Function to log the user in
function loginUser($user_id) {
    $_SESSION['user_id'] = $user_id;
    $_SESSION['logged_in'] = true;
}

// Function to log the user out (to be used in logout.php)
function logoutUser() {
    session_unset();  // Remove all session variables
    session_destroy();  // Destroy the session
}

// Function to check if the user is logged in
function checkAuth() {
    return isset($_SESSION['user_id']) && $_SESSION['logged_in'] === true;
}

// Function to get the current logged-in user ID
function getUserId() {
    return $_SESSION['user_id'] ?? null;
}
?>
