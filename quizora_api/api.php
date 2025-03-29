<?php
// quizora/api.php
// api.php - Main API router

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$request_uri = explode("?", $_SERVER['REQUEST_URI'], 2)[0];

// Fix the request URI to match the actual route without stripping "/quizora_api"
$request_uri = str_replace("/quizora_api", "", $request_uri);

$method = $_SERVER['REQUEST_METHOD'];

// Define API routes
switch (true) {
    // Register function for user
    case $request_uri === "/api/users/register" && $method === "POST":
        include_once __DIR__ . '/routes/userRoutes.php';
        break;

    // Login function for user
    case $request_uri === "/api/users/login" && $method === "POST":
        include_once "routes/userRoutes.php";
        break;

    // Search for user based on ID (GET)
    case preg_match("/^\/api\/users\/\d+$/", $request_uri) && $method === "GET":
        include_once "routes/userRoutes.php";
        break;
    
    // Update user based on ID (PUT)
    case preg_match("/^\/api\/users\/\d+$/", $request_uri) && $method === "PUT":
        include_once "routes/userRoutes.php";
        break;

    // Create quizzes
    case $request_uri === "/api/quizzes" && $method === "POST":
        include_once "routes/quizRoutes.php";
        break;

    // Search for quizzes based on user_id (GET)
    case preg_match("/^\/api\/quizzes\/\d+$/", $request_uri, $matches) && $method === "GET":
        include_once "routes/quizRoutes.php";
        break;
        
    // Search for quizzes (POST)
    case $request_uri === "/api/quizzes/search" && $method === "POST":
        include_once "routes/quizRoutes.php";
        break;
	
	// Updates quizzes
	case $request_uri === "/api/quizzes" && $method === "PUT":
		include_once "routes/quizRoutes.php";
        break;

    default:
        echo json_encode(["message" => "Invalid API endpoint"]);
}
?>
