<?php
// quizora_api/models/User.php

class User {
    public $id;
    public $username;
    public $email;
    public $phoneNum;
    public $password;  // Hashed password

    public function __construct($id = null, $username = "", $email = "", $password = "") {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    // Register user
    public static function registerUser($username, $email, $password, $phoneNum = null) {
        global $pdo;
        // Check if the email already exists in the database
        $sql = "SELECT COUNT(*) FROM users WHERE email = :email";
        $stmt = $pdo->prepare($sql);

        try {
            $stmt->execute([':email' => $email]);
            $emailExists = $stmt->fetchColumn();

            if ($emailExists > 0) {
                return json_encode([
                    "success" => false,
                    "message" => "Email already exists."
                ]);
            } else {
                // Hash the password
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $sql = "INSERT INTO users (username, email, password, phoneNum) VALUES (:username, :email, :password, :phoneNum)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':username' => $username,
                    ':email' => $email,
                    ':password' => $hashedPassword,
                    ':phoneNum' => $phoneNum
                ]);

                return json_encode([
                    "success" => true,
                    "message" => "User registered successfully."
                ]);
            }
        } catch (PDOException $e) {
            return json_encode([
                "success" => false,
                "message" => "Database error: " . $e->getMessage()
            ]);
        }
    }

    // Login user
    public static function loginUser($email, $password) {
        global $pdo;

        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);  // Remove password from response
            return $user;  // Return user data
        } else {
            return null; // Login failed
        }
    }

    // Get user by ID
    public static function getUserById($id) {
        global $pdo;

        $sql = "SELECT id, username, email FROM users WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Update user details
    public static function updateUser($userId, $username = null, $email = null, $phoneNum = null) {
        global $pdo;

        $fields = [];
        $params = [':id' => $userId];

        if ($username) {
            $fields[] = "username = :username";
            $params[':username'] = $username;
        }

        if ($email) {
            $fields[] = "email = :email";
            $params[':email'] = $email;
        }

        if ($phoneNum) {
            $fields[] = "phoneNum = :phoneNum";
            $params[':phoneNum'] = $phoneNum;
        }

        if (count($fields) > 0) {
            $sql = "UPDATE users SET " . implode(", ", $fields) . " WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);

            return ["success" => true, "message" => "User updated successfully."];
        }

        return ["success" => false, "message" => "No fields to update."];
    }
}

?>
