<?php
// quizora_api/models/Quiz.php

class Quiz {
    public $id;
    public $title;
    public $description;
    public $user_id;
    public $category;   
	public $questions;  

    public function __construct($id = null, $title = "", $description = "", $user_id = null, $questions = null, $category = null) {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->user_id = $user_id;
        $this->category = $category;
        $this->questions = $questions;
    }

    // Add a new quiz
    public static function addQuiz($title, $description, $user_id, $questions = null, $category = null) {
        global $pdo;

        $sql = "INSERT INTO quizzes (title, description, user_id, category, questions) 
                VALUES (:title, :description, :user_id, :category, :questions)";
        $stmt = $pdo->prepare($sql);
        try {
            $stmt->execute([
                ':title' => $title,
                ':description' => $description,
                ':user_id' => $user_id,
				':category' => $category,
                ':questions' => $questions ? json_encode($questions) : null  // Convert questions to JSON if provided
            ]);
            return json_encode(["success" => true, "message" => "Quiz added successfully"]);
        } catch (PDOException $e) {
            return json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
        }
    }

    // Get quizzes by user (updated to include questions and category)
    public static function getQuizzesByUser($user_id) {
        global $pdo;

        $sql = "SELECT id, title, description, category, questions FROM quizzes WHERE user_id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':user_id' => $user_id]);

        // Fetch and return the quizzes as an associative array, decode questions as JSON
        $quizzes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($quizzes as &$quiz) {
            $quiz['questions'] = json_decode($quiz['questions'], true);  // Decode questions JSON
        }
        return $quizzes;
    }

    // Search quizzes by field
    public static function searchQuizzesByField($searchTerm, $searchField) {
		global $pdo;

		// Prepare the SQL query to search for quizzes where the chosen field contains the search term
		$sql = "SELECT id, title, description, category, questions FROM quizzes WHERE $searchField LIKE :searchTerm";
		$stmt = $pdo->prepare($sql);
		$stmt->execute([':searchTerm' => '%' . $searchTerm . '%']);

		// Fetch and return the results as an associative array
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	
	// Update quiz details and questions
    public static function updateQuiz($quiz_id, $title, $description, $category, $questions) {
        global $pdo;

        // Update quiz details
        $sql = "UPDATE quizzes SET title = :title, description = :description, category = :category WHERE id = :quiz_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':title' => $title,
            ':description' => $description,
            ':category' => $category,
            ':quiz_id' => $quiz_id
        ]);

        // Now update the questions if provided
        if ($questions !== null) {
            // Remove all old questions for the quiz (you may want to add a soft delete or archive option)
            $deleteSql = "DELETE FROM quiz_questions WHERE quiz_id = :quiz_id";
            $deleteStmt = $pdo->prepare($deleteSql);
            $deleteStmt->execute([':quiz_id' => $quiz_id]);

            // Add the new questions
            foreach ($questions as $question) {
                $insertSql = "INSERT INTO quiz_questions (quiz_id, type, question, answer, options, timer, points) VALUES (:quiz_id, :type, :question, :answer, :options, :timer, :points)";
                $insertStmt = $pdo->prepare($insertSql);
                $insertStmt->execute([
                    ':quiz_id' => $quiz_id,
                    ':type' => $question['type'],
                    ':question' => $question['question'],
                    ':answer' => $question['answer'],
                    ':options' => json_encode($question['options']),
                    ':timer' => $question['timer'],
                    ':points' => $question['points']
                ]);
            }
        }

        return ["success" => true, "message" => "Quiz and questions updated successfully."];
    }
}
?>
