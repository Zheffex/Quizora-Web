<?php
// quizora_api/public/web/php/dashboard.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="icon" href="../media/img/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>

    <?php include_once("./fragments/sidebar.php")?>

    <div class="main-content">
        <div class="dashboard">
            <h1 class="dashboard-title">Dashboard</h1>

            <div class="stats">
                <div class="card">
                    <a href="dash.php">
                    <div>    
                    <i class="fa-solid fa-users"></i>
                    <p>Users</p>
                    <h2>0</h2>
                    </div>
                    </a>
                </div>
                
                <div class="card">
                    <div>
                    <i class="fa-solid fa-layer-group"></i>
                    <p>Total Categories</p>
                    <h2>0</h2>
                    </div>
                </div>
                
                <div class="card empty"></div>
                <div class="card empty"></div>
            </div>
        </div>
    </div>
    <script src="../js/animation.js"></script>
</body>
</html>
