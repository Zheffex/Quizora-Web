<?php
// quizora_api/public/web/php/settings.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="icon" href="../media/img/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../css/settings.css">
</head>
<body>

    <!-- Sidebar -->
    <?php include_once("./fragments/sidebar.php")?>

    <!-- Main Content -->
    <div class="main-content">
        <div class="settings-container">
            
            
            <div class="profile-container">
                <div class="profile-card">
                    <!-- Icon with Circular Background -->
                    <div class="profile-avatar">
                        <img src="../media/img/profile.png" alt="Profile Picture">
                    </div>
            
                    <!-- User Info to the Right of the Icon -->
                    <div class="profile-info">
                        <h2 class="profile-name">John Doe</h2>
                        <p class="profile-email">johndoe@example.com</p>
                    </div>
                </div>
            </div>
            


            <!-- Account Settings Panel -->
            <div class="settings-panel">
                <div class="settings-header">Account settings</div>

                <div class="settings-option">
                    <a href="update-password.php">
                        <span>Update Password</span>
                        <i class="fa-solid fa-chevron-right"></i>
                    </a>
                </div>

                <div class="settings-option">
                    <a href="delete-account.php">
                        <span>Delete account</span>
                        <i class="fa-solid fa-chevron-right"></i>
                    </a>
                </div>

                <div class="settings-option logout">
                    <a href="functions/logout.php">
                        <span>Logout</span>
                        <i class="fa-solid fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Update Password Modal -->
    <div id="updateModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Update Password</h2>
            <p>Enter your new password details here.</p>

            <!-- Current Password -->
            <label for="currentPassword" class="update-label">Current Password</label>
            <input
                type="password"
                id="currentPassword"
                class="update-input"
                placeholder="Enter current password"
            >

            <!-- New Password -->
            <label for="newPassword" class="update-label">New Password</label>
            <input
                type="password"
                id="newPassword"
                class="update-input"
                placeholder="Enter new password"
            >

            <!-- Confirm New Password -->
            <label for="confirmPassword" class="update-label">Confirm New Password</label>
            <input
                type="password"
                id="confirmPassword"
                class="update-input"
                placeholder="Re-enter new password"
            >
            
            <!-- Action Buttons -->
            <div class="update-buttons">
                <button id="updateCancel" class="update-btn cancel-btn">Cancel</button>
                <button id="updateSave" class="update-btn save-btn">Save</button>
            </div>
        </div>
    </div>



    <!-- Delete Account Modal -->
<div id="deleteModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        
        <!-- Password input (always visible) -->
        <label for="deletePassword" class="delete-label">Enter password to delete:</label>
        <input 
            type="text" 
            id="deletePassword" 
            class="delete-input"
            placeholder="Enter your password"
        >

        <!-- Action Buttons -->
        <div class="delete-buttons">
            <button id="deleteCancel" class="delete-btn cancel-btn">Cancel</button>
            <button id="deleteConfirm" class="delete-btn confirm-btn">Delete Account</button>
        </div>
    </div>
</div>


    <!-- Logout Modal -->
    <div id="logoutModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>

            <!-- Logout Action Buttons -->
            <div class="logout-buttons">
                <button id="logoutConfirm">Logout</button>
                <button id="logoutCancel">Cancel</button>
            </div>
        </div>
    </div>


    <script src="../js/settings.js"></script>
</body>
</html>
