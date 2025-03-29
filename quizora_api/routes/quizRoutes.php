<?php
// quizora_api/routes/quizRoutes.php

include_once __DIR__ . '/../controllers/QuizController.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

// Strip "/quizora_api" from the URI if it's there
$request_uri = str_replace("/quizora_api", "", explode("?", $_SERVER['REQUEST_URI'], 2)[0]);

// Check the POST request to add a quiz
if ($request_uri === "/api/quizzes" && $method === "POST") {
    echo json_encode(QuizController::addQuiz($input));
}
// Check if the request is for a specific user (GET /api/quizzes/{user_id})
elseif (preg_match("/^\/api\/quizzes\/(\d+)$/", $request_uri, $matches) && $method === "GET") {
    // Get quizzes by user_id (for example, /api/quizzes/11)
    echo json_encode(QuizController::getQuizzes($matches[1]));
}
// Check if the request is for searching quizzes by title
elseif ($request_uri === "/api/quizzes/search" && $method === "POST") {
    // Search quizzes by title
    echo json_encode(QuizController::searchQuizzes($input));
} 
elseif ($request_uri === "/api/quizzes" && $method === "PUT") {
    // Update quiz
    echo json_encode(QuizController::updateQuiz($input));
}else {
    echo json_encode(["message" => "Invalid API endpoint"]);
}

?>

