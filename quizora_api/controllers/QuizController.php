<?php
// quizora_api/controllers/QuizController.php

include_once __DIR__ . '/../config/db.php';  
include_once __DIR__ . '/../models/Quiz.php';
include_once __DIR__ . '/../public/web/php/functions/session.php';  // To check if the user is logged in

class QuizController {
	// Question validator to prevent random json structure
	public static function validateQuestions($questions) {
		if (!is_array($questions)) {
			return ["success" => false, "message" => "Questions must be an array."];
		}

		foreach ($questions as $question) {
			// Check that each question has the required fields
			if (!isset($question['type'], $question['question'], $question['answer'])) {
				return ["success" => false, "message" => "Each question must have 'type', 'question', and 'answer' fields."];
			}

			// Additional checks as needed (timer, points, options, etc.)
			if (!in_array($question['type'], ['multiple choice', 'true or false', 'fill in the blank'])) {
				return ["success" => false, "message" => "Invalid question type. Allowed types: 'multiple choice' , 'true or false' , 'fill in the blank'."];
			}

			if (isset($question['options']) && !is_array($question['options'])) {
				return ["success" => false, "message" => "'options' field must be an array."];
			}
		}

		return ["success" => true];  // If everything checks out
	}

	// Creates quiz
    public static function addQuiz($data) {
		// Check if the required fields are present
		if (isset($data['title'], $data['description'])) {
			if (!checkAuth()) {
				return ["success" => false, "message" => "You must be logged in to add a quiz."];
			}

			$user_id = $_SESSION['user_id'];  // Assuming the user_id is stored in the session
			$questions = isset($data['questions']) ? $data['questions'] : null;
			$category = isset($data['category']) ? $data['category'] : null;

			// Validate questions format
			if ($questions) {
				$validationResult = self::validateQuestions($questions);
				if (!$validationResult['success']) {
					return $validationResult;
				}
			}

			// Call the addQuiz method from the model
			$result = Quiz::addQuiz($data['title'], $data['description'], $user_id, $questions, $category);
			return json_decode($result, true);
		}

		return ["success" => false, "message" => "Missing required fields: title or description."];
	}

    // Retrieves and returns all quizzes for a specific user
    public static function getQuizzes($user_id) {
        // Call the getQuizzesByUser method from the model
        $quizzes = Quiz::getQuizzesByUser($user_id);

        if (empty($quizzes)) {
            return ["success" => false, "message" => "No quizzes found for this user."];
        }

        return ["success" => true, "quizzes" => $quizzes];
    }

    // Search quizzes for whatever the term is based from the requested field e.g: {search_term: "Quiz", search_field: "title"} returns quizzes that has "Quiz" in their title
    public static function searchQuizzes($data) {
		// Check if the required parameters are set
		if (isset($data['search_term'], $data['search_field'])) {
			$searchTerm = $data['search_term'];
			$searchField = $data['search_field']; // 'title' or 'description' or other fields

			// Validate the search field
			$validFields = ['title', 'description'];  // Add other fields if necessary
			if (!in_array($searchField, $validFields)) {
				return ["success" => false, "message" => "Invalid search field. Allowed fields: title, description"];
			}

			// Call the search method from the model, passing both the search term and the field
			$quizzes = Quiz::searchQuizzesByField($searchTerm, $searchField);

			if (empty($quizzes)) {
				return ["success" => false, "message" => "No quizzes found with the search term '{$searchTerm}' in the '{$searchField}'."];
			}

			return ["success" => true, "quizzes" => $quizzes];
		}

		return ["success" => false, "message" => "Missing search term or search field."];
	}
	
	// Authorization check to ensure the current user is the owner of the quiz
    private static function isAuthorizedToEditQuiz($quiz_id, $user_id) {
        global $pdo;

        // Query to get the user_id of the quiz owner
        $sql = "SELECT user_id FROM quizzes WHERE id = :quiz_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':quiz_id' => $quiz_id]);

        // Fetch the result
        $quiz = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if the quiz exists and if the user is authorized
        if ($quiz && $quiz['user_id'] == $user_id) {
            return true; // User is authorized
        }

        return false; // User is not authorized
    }

    // Update quiz details and questions
    public static function updateQuiz($data) {
        // Ensure the necessary fields are present
        if (isset($data['quiz_id'], $data['title'], $data['description'])) {
            // Ensure the user is logged in
            if (!checkAuth()) {
                return ["success" => false, "message" => "You must be logged in to update a quiz."];
            }

            $user_id = $_SESSION['user_id']; // Get the logged-in user's ID
            $quiz_id = $data['quiz_id'];
            $title = $data['title'];
            $description = $data['description'];
            $category = isset($data['category']) ? $data['category'] : null;
            $questions = isset($data['questions']) ? $data['questions'] : null;

            // Authorization check: Make sure the user is authorized to update this quiz
            if (!self::isAuthorizedToEditQuiz($quiz_id, $user_id)) {
                return ["success" => false, "message" => "You are not authorized to update this quiz."];
            }

            // Validate questions if provided
            if ($questions !== null) {
                $validationResult = self::validateQuestions($questions);
                if (!$validationResult['success']) {
                    return $validationResult;
                }
            }

            // Call the model method to update the quiz
            $result = Quiz::updateQuiz($quiz_id, $title, $description, $category, $questions);
            return $result;
        }

        return ["success" => false, "message" => "Missing required fields: quiz_id, title, or description."];
    }
}

?>
