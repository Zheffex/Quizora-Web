<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="icon" href="../media/img/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../css/management.css">
</head>
<body>

    <div class="sidebar">
        <div class="logo">
            <a href="homepage.html">
            <img src="../media/img/logo.png" alt="Logo">
            </a>
        </div>
        <ul class="menu">
            <li> <a href="dashboard.html">Dashboard</a></li>
            <li><a href="create.html">Create</a></li>
            <li class="active"><a href="management.html">User Management</a></li>
            <li><a href="settings.html">Settings</a></li>
        </ul>
    </div>

    <div class="main-content">
        <div class="management">
            <h1 class="user-management-title">User Management</h1>
    
            <!-- User Management Section -->
            <div class="user-management">
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Quiz Count</th>
                            <th>Quiz Name</th>
                            <th>Duration/Time Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User Fullname</td>
                            <td>User Email Address</td>
                            <td>None</td>
                            <td>Quiz Name</td>
                            <td>None</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    
    <script src="../js/management.js"></script>
</body>
</html>
