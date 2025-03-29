<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quizora</title>
    <link rel="icon" href="../media/img/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../css/loading.css">
    <link rel="stylesheet" href="../css/quizcreation.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

    <!-- Loading Screen -->
    <div id="loading-screen">
        <div class="loading-box">
            <div class="loader"></div>
            <p>BUILDING QUIZ</p>
        </div>
    </div>

    <div class="quiz-container">
        <div class="quiz-header">
            <a href="create.php">
                <i class="fa-solid fa-angle-left"></i>
                Back
            </a>
    
            <span class="quiz-title">Your Quiz Title</span>
    
            <a href="create.php" id="save-quiz-progress">
                <i class="fa-solid fa-floppy-disk"></i>
                Save
            </a>
        </div>
    </div>
    

    <div class="quiz-content">
        <h2>Create your questions</h2>
        <h3>Select a Question Type</h3>
        <div class="question-options">

            <div class="question-type" onclick="setQuestionType('Multiple Choice', 'multiple.png')">
                <a href="editquestion.php">
                    <img src="../media/img/Multiple.png" alt="Multiple-choice">
                    <p>Multiple Choice</p>
                </a>
            </div>
            
            <div class="question-type" onclick="setQuestionType('Fill in the Blank', 'fill.png')">
                <a href="editquestion.php">
                    <img src="../media/img/Fill.png" alt="Fill-blank">
                    <p>Fill in the Blank</p>
                </a>
            </div>
            
            <div class="question-type" onclick="setQuestionType('True or False', 'True.png')">
                <a href="editquestion.php">
                    <img src="../media/img/True.png" alt="True-false">
                    <p>True or False</p>
                </a>
            </div>
                </a>
            </div>
        </div>
    </div>

    <div class="save-quiz-container">

        <h2>Quiz Overview</h2>
        <div class="button-container">

                <a href="editquestion.php">
                <i class="fa-solid fa-plus"></i> Add Question
                </a>

            <button id="delete-button" class="delete-quiz-btn">
                <i class="fa-solid fa-trash-can"></i> Remove
            </button>            
        </div>
        
    

        
        <div class="quiz-list">
           
            <div class="quiz-item">

                <div class="Quiz-name-container">
                    <h4 id="Quiz-counter">1.</h4>
                    <h3 id="Question-Placer">Question</h3>
                    <input type="checkbox" class="quiz-select-checkbox">
                </div>
                
                <div class="quiz-choices">
                    <p id="Right-Answer-holder">Right Answer</p>
                    <p id="points-holder">Points</p>
                    <p id="time-holder">time</p>
                    <p id="Question-type-holder">Question type</p>

                    <button class="edit-question-btn">
                        <i class="fa-solid fa-pen"></i>
                        Edit
                    </button>

                </div>
            </div>
        </div>
    </div>
    

    <script src="../js/loading.js"></script>
</body>
</html>
