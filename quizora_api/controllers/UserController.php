<?php
// quizora_api/controllers/UserController.php

include_once __DIR__ . '/../config/db.php';  
include_once __DIR__ . '/../models/User.php';  
include_once __DIR__ . '/../public/web/php/functions/session.php';  // Include session management functions
require_once __DIR__ . '/../vendor/autoload.php';

use \Firebase\JWT\JWT;  // Make sure to import the JWT class

class UserController {

    private static $secretKey = 'YOUR_SECRET_KEY';  // Set a secret key for signing the JWT token

    // Method to create JWT token
	private static function createJWT($userId) {
		$issuedAt = time();
		$expirationTime = $issuedAt + 3600;  // JWT valid for 1 hour from the issued time
		$payload = array(
			"userId" => $userId,
			"iat" => $issuedAt,
			"exp" => $expirationTime
		);

		// Add the algorithm parameter to encode
		return JWT::encode($payload, self::$secretKey, 'HS256');
	}

    public static function loginUser($data) {
        if (isset($data['email'], $data['password'])) {
            $user = User::loginUser($data['email'], $data['password']);
            if ($user) {
                // Generate JWT token after successful login
                $token = self::createJWT($user['id']);  // Generate token based on user ID
                $user['token'] = $token;  // Attach the token to the user data

                return ["success" => true, "user" => $user];
            }
            return ["success" => false, "message" => "Invalid credentials."];
        }
        return ["success" => false, "message" => "Missing email or password."];
    }

    public static function registerUser($data) {
        if (isset($data['username'], $data['email'], $data['password'])) {
            $phoneNum = isset($data['phoneNum']) ? $data['phoneNum'] : null;
            $result = User::registerUser($data['username'], $data['email'], $data['password'], $phoneNum);
            $result = json_decode($result, true);
            return $result;
        }
        return ["success" => false, "message" => "Missing required fields: username, email, or password."];
    }

    public static function getUserById($id) {
        $user = User::getUserById($id);
        return $user ? ["success" => true, "user" => $user] : ["success" => false, "message" => "User not found."];
    }

    // Update User Function
    public static function updateUser($data, $userId) {
        if (isset($data['username']) || isset($data['email']) || isset($data['phoneNum'])) {
            // Ensure at least one field to update
            $username = isset($data['username']) ? $data['username'] : null;
            $email = isset($data['email']) ? $data['email'] : null;
            $phoneNum = isset($data['phoneNum']) ? $data['phoneNum'] : null;

            // Update the user in the database
            $result = User::updateUser($userId, $username, $email, $phoneNum);

            return $result;
        }
        return ["success" => false, "message" => "No valid fields to update."];
    }
}
?>
