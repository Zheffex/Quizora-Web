<?php
// quizora_api/routes/userRoutes.php

include_once __DIR__ . '/../controllers/UserController.php';
include_once __DIR__ . '/../public/web/php/functions/session.php';  // Include session management

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

// Strip "/quizora_api" from the URI if it's there
$request_uri = str_replace("/quizora_api", "", explode("?", $_SERVER['REQUEST_URI'], 2)[0]);

// Check if user is authenticated for protected routes
if ($request_uri !== "/api/users/login" && !checkAuth()) {
    echo json_encode(["success" => false, "message" => "Unauthorized access. Please log in."]);
    exit(); // Terminate the script if the user is not authenticated
}

// Route for status checking
if ($request_uri === "/api/users/status" && $method === "GET") {
    if (checkAuth()) {
        echo json_encode(["loggedIn" => true, "userId" => getLoggedInUserId()]);
    } else {
        echo json_encode(["loggedIn" => false]);
    }
    exit();
}

// Handle API routing
switch (true) {
    case $request_uri === "/api/users/register" && $method === "POST":
        echo json_encode(UserController::registerUser($input));
        break;

    case $request_uri === "/api/users/login" && $method === "POST":
        echo json_encode(UserController::loginUser($input));
        break;

    case preg_match("/^\/api\/users\/(\d+)$/", $request_uri, $matches) && $method === "GET":
        echo json_encode(UserController::getUserById($matches[1]));
        break;

    case preg_match("/^\/api\/users\/(\d+)$/", $request_uri, $matches) && $method === "PUT":
        echo json_encode(UserController::updateUser($input, $matches[1]));
        break;

    default:
        echo json_encode(["message" => "Invalid user request."]);
}

?>
