<?php
// quizora_api/public/web/php/homepage.php
// Update the last activity time
$_SESSION['last_activity'] = time();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="icon" href="../media/img/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../css/image.css">
    <link rel="stylesheet" href="../css/homepage.css">
</head>
<body>
    <?php include_once("./fragments/sidebar.php")?>

    <section class="main-content">
        <header class="header">
            <input type="text" class="search-bar" placeholder="Search">
            <div class="admin-profile">
                <span class="fa-solid fa-user"></span> ADMIN
            </div>
        </header>
        
        <div class="container">
            <div class="wrap">
                <div class="slider">
                    <img src="../media/img/LEARN.png" alt="1">
                    <img src="../media/img/ENGAGE.png" alt="2">
                    <img src="../media/img/DISCOVER.png" alt="3">
                    <img src="../media/img/TEST.png" alt="4">
                    <img src="../media/img/TIMER.png" alt="5">
                </div>
                <div class="slider-nav">
                    <a href="#"></a>
                    <a href="#"></a>
                    <a href="#"></a>
                    <a href="#"></a>
                    <a href="#"></a>
                </div>
            </div>
        </div>

        <div class="QUIZ-CONTAINER">
            <h2>QUIZ SUGGESTIONS</h2>
            <div class="calendar-container">
                <div class="quiz" data-title="English Quiz" data-img="en_glish.jpg" data-questions="10">
                    <a href="#"><img src="../media/img/en_glish.jpg" alt="QUIZ 1"></a>
                </div>
                <div class="quiz" data-title="Math Quiz" data-img="ma_th.jpg" data-questions="15">
                    <a href="#"><img src="../media/img/ma_th.jpg" alt="QUIZ 2"></a>
                </div>
                <div class="quiz" data-title="Science Quiz" data-img="scie_nce.png" data-questions="12">
                    <a href="#"><img src="../media/img/scie_nce.png" alt="QUIZ 3"></a>
                </div>
                <div class="quiz" data-title="History Quiz" data-img="his_tory.jpg" data-questions="8">
                    <a href="#"><img src="../media/img/his_tory.jpg" alt="QUIZ 4"></a>
                </div>
            </div>
        </div>
        

        <!-- ✅ MODAL STRUCTURE -->
        <div id="quizModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 id="modal-title">Quiz Title</h2>
                <img id="modal-image" src="" alt="Quiz Image">
                <p id="modal-description">Quiz description goes here.</p>
                <p><strong>Number of Questions:</strong> <span id="modal-question-count">0</span></p>
                <button id="startQuiz">Start Quiz</button>
            </div>
        </div>
        
    </section>

    <script src="../js/image.js"></script>
</body>

