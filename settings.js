document.addEventListener("DOMContentLoaded", function() {
    // 1) Show the main content with animation
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
        setTimeout(() => {
            mainContent.classList.add("show");
        }, 150);
    }


    //shows all the modal.
    // 
    // 2) Settings panel links
    const updateLink = document.querySelector(".settings-option a[href='update-password.html']");
    const deleteLink = document.querySelector(".settings-option a[href='delete-account.html']");
    const logoutLink = document.querySelector(".settings-option a[href='logout.html']");

    // 3) Modals
    const updateModal = document.getElementById("updateModal");
    const deleteModal = document.getElementById("deleteModal");
    const logoutModal = document.getElementById("logoutModal");

    // 4) Close buttons
    const closeButtons = document.querySelectorAll(".modal .close");

    // 5) Logout modal buttons
    const logoutConfirm = document.getElementById("logoutConfirm");
    const logoutCancel = document.getElementById("logoutCancel");

    // 6) Open each modal on click, prevent default
    updateLink.addEventListener("click", function(e) {
        e.preventDefault();
        updateModal.style.display = "flex";
    });
    deleteLink.addEventListener("click", function(e) {
        e.preventDefault();
        deleteModal.style.display = "flex";
    });
    logoutLink.addEventListener("click", function(e) {
        e.preventDefault();
        logoutModal.style.display = "flex";
    });

    // 7) Close modal on (X) click
    closeButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            this.closest(".modal").style.display = "none";
        });
    });

    // 8) Close modal when clicking outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });
});









//delete function
document.addEventListener("DOMContentLoaded", function() {
    const deleteModal = document.getElementById("deleteModal");
    const closeBtn = deleteModal.querySelector(".close");
    const deleteCancel = document.getElementById("deleteCancel");
    const deleteConfirm = document.getElementById("deleteConfirm");
    const deletePassword = document.getElementById("deletePassword");

    // Open the modal (if needed)
    // e.g., document.getElementById("someDeleteLink").addEventListener("click", () => { deleteModal.style.display = "flex"; });

    // Close on (X)
    closeBtn.addEventListener("click", () => {
        deleteModal.style.display = "none";
        deletePassword.value = ""; // Clear the field
    });

    // Close on cancel
    deleteCancel.addEventListener("click", () => {
        deleteModal.style.display = "none";
        deletePassword.value = ""; // Clear the field
    });

    // Require input before deleting
    deleteConfirm.addEventListener("click", () => {
        if (!deletePassword.value.trim()) {
            alert("⚠ Please enter your password to delete your account.");
            return; // Stop here if empty
        }

        // ✅ Perform delete logic if password is entered
        alert("✅ Account deleted successfully!");

        // Hide the modal, clear input
        deleteModal.style.display = "none";
        deletePassword.value = "";

        // Redirect to login page after deletion
        window.location.href = "login.html";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", function(e) {
        if (e.target.classList.contains("modal")) {
            deleteModal.style.display = "none";
            deletePassword.value = "";
        }
    });
});












//logout function
function handleLogoutModal() {
    const logoutModal = document.getElementById("logoutModal");
    const logoutConfirm = document.getElementById("logoutConfirm");
    const logoutCancel = document.getElementById("logoutCancel");
    const closeButton = logoutModal.querySelector(".close");
    const logoutLink = document.querySelector(".settings-option a[href='logout.html']");
    
    // Notification area (Optional: Add a div with id="logoutMessage" in your HTML)
    const logoutMessage = document.createElement("div");
    logoutMessage.id = "logoutMessage";
    logoutMessage.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#0E6C5E; color:white; padding:10px 20px; border-radius:5px; display:none;";
    document.body.appendChild(logoutMessage);

    // Function to open modal
    function openModal(event) {
        event.preventDefault();
        logoutModal.style.display = "flex";
    }

    // Function to close modal
    function closeModal() {
        logoutModal.style.display = "none";
    }

    function confirmLogout() {
        logoutMessage.textContent = "Logging out...";
        logoutMessage.style.display = "block";
    
        // Delay logout for 1.5 seconds to show message
        setTimeout(() => {
            window.location.href = "login.html"; // Redirect to login page
            history.replaceState(null, null, "login.html"); // Prevent going back
        }, 1500);
    }
    


    // Attach event listeners
    if (logoutLink) {
        logoutLink.addEventListener("click", openModal);
    }
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
    if (logoutCancel) {
        logoutCancel.addEventListener("click", closeModal);
    }
    if (logoutConfirm) {
        logoutConfirm.addEventListener("click", confirmLogout);
    }

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === logoutModal) {
            closeModal();
        }
    });
}

// Call the function after DOM is loaded
document.addEventListener("DOMContentLoaded", handleLogoutModal);
