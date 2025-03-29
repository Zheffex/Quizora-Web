<?php
// quizora_api/public/web/php/create.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="icon" href="../media/img/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../css/create.css">
</head>
<body>

    <?php include_once("./fragments/sidebar.php")?>

    <div class="main-content">
        <header>
            <h1>Create</h1>
            
            <div class="user-info">
                    <a href="#">
                    <span class="fa-solid fa-user"></span>
                    </a>

                    <div class="user-dropdown" id="dropdown-menu">
                    <a href="settings.php">
                        <i class="fa-solid fa-user"></i>
                        View Profile
                    </a>

                    <a href="Settings.php">
                        <i class="fa-solid fa-gear"></i>
                        Settings
                    </a>
                </div>
            </div>
        </header>
    

        <section class="dashboard-widgets">
            <div class="widget-container" id="createQuizBtn">
                <a href="Quizcreation.php" class="widget">
                    <div>
                    <i class="fas fa-folder-plus"></i>
                    <h3>Create Quiz</h3>
                    </div>
                </a>
            </div>
        </section>
        </div>

        <div class="quiz-container">
            <div class="quiz-header">
                <h2>YOUR QUIZ</h2>
                <button class="delete-btn">
                    <i class="fa-solid fa-trash" id="Quiz-Delete"></i>
                    Remove
                </button>
            </div>
        
            <div class="quiz-list">
                <a href="#">
                    <div class="quiz-item">
                        <div class="quiz-details">
                            <h3 class="quiz-title">Quiz Title</h3>
                            <input type="checkbox" class="quiz-checkbox">
                        </div>
                        <p class="quiz-info">0 Qs</p>
                    </div>
                </a>    
                <div class="empty-message">
                    <img src="../media/img/logo.png" alt="Empty">
                    <p>No quizzes available. Create a new quiz to get started!</p>
                </div>
            </div>
            
        </div>
        
        

        <!-- Modal Structure -->
        <div id="createQuizModal1" class="modal-Quiz1">
            <div class="modal-content1">
                <span class="close" onclick="closeModal()">&times;</span>
                <h2>Quiz Progress</h2>
                <p>Do you want to edit or answer the quiz?</p>
                <div class="modal-buttons1">
                    <button id="editQuizButton" class="edit-quiz-btn">Edit Quiz</button>
                    <button onclick="answerQuiz()">Answer</button>
                </div>
            </div>
        </div>

        <div id="createQuizModal" class="modal">
            <div class="modal-content">
                <h2>Create your quiz</h2>

                <form id="quizForm">
                    <input type="text" id="quizTitle" placeholder="Enter Quiz Title" required>

                    <div class="modal-buttons">
                        <button id="cancelBtn" type="button">Cancel</button>
                        <button id="makeQuizBtn" type="submit">Make Quiz</button>

                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="../js/create.js"></script>
</body>
</html>
