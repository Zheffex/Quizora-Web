// quizora_api/public/web/js/create.js
console.log('JS Loaded'); // Checks if js is loaded through console logs
//animation
document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.querySelector(".main-content");

    if (mainContent) {
        setTimeout(() => {
            mainContent.classList.add("show");
        }, 150); // Small delay for smooth effect
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.querySelector(".user-info a"); // Selects the profile button
    const userInfo = document.querySelector(".user-info");

    if (!profileBtn || !userInfo) {
        console.error("Element not found! Check your HTML.");
        return;
    }

    profileBtn.addEventListener("click", function (event) {
        event.preventDefault();
        userInfo.classList.toggle("active"); // Toggle class to show/hide dropdown
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!userInfo.contains(event.target)) {
            userInfo.classList.remove("active");
        }
    });
});















// delete and display button function.
document.addEventListener("DOMContentLoaded", function () {
    const quizList = document.querySelector(".quiz-list");
    const deleteBtn = document.querySelector(".delete-btn");

    function loadQuizzes() {
        const allQuizzes = JSON.parse(localStorage.getItem("allSavedQuizzes")) || [];
        quizList.innerHTML = "";

        if (allQuizzes.length === 0) {
            quizList.innerHTML = `
                <div class="empty-message">
                    <img src="../media/img/emptyquiz.png" alt="Empty">
                    <p>No quizzes available. Create a new quiz to get started!</p>
                </div>`;
            return;
        }

        allQuizzes.forEach(quiz => {
            const quizItem = document.createElement("div");
            quizItem.classList.add("quiz-item");
            quizItem.dataset.quizId = quiz.quizId;

            quizItem.innerHTML = `
                <div class="quiz-details">
                    <h3 class="quiz-title">${quiz.title || "Untitled Quiz"}</h3>
                    <input type="checkbox" class="quiz-checkbox">
                </div>
                <p class="quiz-info">${quiz.questionCount} Qs</p>
            `;

            quizList.appendChild(quizItem);
        });

        attachCheckboxEventListeners();
    }

    function attachCheckboxEventListeners() {
        document.querySelectorAll(".quiz-checkbox").forEach(checkbox => {
            checkbox.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        });
    }

    function saveQuiz() {
        let quizTitle = document.querySelector(".quiz-title").textContent.trim();
        let savedQuizzes = JSON.parse(localStorage.getItem("allSavedQuizzes")) || [];
        let savedQuestions = JSON.parse(localStorage.getItem("quizzes")) || [];

        if (savedQuestions.length === 0) {
            alert("⚠️ Please add at least one question before saving.");
            return;
        }

        let existingQuiz = savedQuizzes.find(quiz => quiz.title.toLowerCase() === quizTitle.toLowerCase());

        if (existingQuiz) {
            // ✅ Update existing quiz instead of creating a duplicate
            existingQuiz.questionCount = savedQuestions.length;
            existingQuiz.questions = savedQuestions;
        } else {
            // ✅ Create a new quiz only if it doesn't exist
            const newQuizId = Date.now().toString();
            let quizData = {
                quizId: newQuizId,
                title: quizTitle || "Untitled Quiz",
                questionCount: savedQuestions.length,
                questions: savedQuestions
            };

            savedQuizzes.push(quizData);
        }

        localStorage.setItem("allSavedQuizzes", JSON.stringify(savedQuizzes));
        localStorage.removeItem("quizzes");

        // ✅ Redirect back to create.php
        window.location.href = "create.php";
    }

    function deleteQuiz() {
        const selectedQuizzes = document.querySelectorAll(".quiz-checkbox:checked");

        if (selectedQuizzes.length === 0) {
            alert("⚠️ Please select a quiz to remove.");
            return;
        }

        if (!confirm("Are you sure you want to delete the selected quiz? This action cannot be undone.")) {
            return;
        }

        let allQuizzes = JSON.parse(localStorage.getItem("allSavedQuizzes")) || [];

        selectedQuizzes.forEach(checkbox => {
            const quizItem = checkbox.closest(".quiz-item");
            const quizId = quizItem.dataset.quizId;
            allQuizzes = allQuizzes.filter(quiz => quiz.quizId !== quizId);
            quizItem.remove();
        });

        localStorage.setItem("allSavedQuizzes", JSON.stringify(allQuizzes));

        if (allQuizzes.length === 0) {
            quizList.innerHTML = `
                <div class="empty-message">
                    <img src="../media/img/emptyquiz.png" alt="Empty">
                    <p>No quizzes available. Create a new quiz to get started!</p>
                </div>`;
        }

        alert("✅ Quiz successfully deleted.");
    }

    if (deleteBtn) {
        deleteBtn.addEventListener("click", deleteQuiz);
    }

    const saveButton = document.getElementById("save-quiz-progress");
    if (saveButton) {
        saveButton.addEventListener("click", function (event) {
            event.preventDefault();
            saveQuiz();
        });
    }

    loadQuizzes();
});












// Modal 1 function
document.addEventListener("DOMContentLoaded", function () {
    const quizItems = document.querySelectorAll(".quiz-item"); // Select whole quiz item
    const modal = document.getElementById("createQuizModal1");
    const closeBtn = modal.querySelector(".close"); // Ensure correct close button
    const modalContent = modal.querySelector(".modal-content1"); // Get modal content

    // Function to open the modal
    function openModal(event) {
        // Prevent modal from opening if the checkbox inside is clicked
        if (event.target.closest(".quiz-checkbox")) {
            return;
        }

        modal.style.display = "flex"; // Show modal
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none"; // Hide modal
    }

    // Add event listener to all quiz items (except checkbox)
    quizItems.forEach(item => {
        item.addEventListener("click", openModal);
    });

    // Close modal when clicking on close button
    closeBtn.addEventListener("click", closeModal);

    // Close modal only if clicking outside modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal && !modalContent.contains(event.target)) {
            closeModal();
        }
    });
});










//Modal Function
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("quizModal");
    const modalContent = document.querySelector(".modal-content");
    const openBtn = document.getElementById("createQuizBtn");
    const closeBtn = document.querySelector(".close");

    // Show modal when "Create Quiz" is clicked
    openBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "flex";
        setTimeout(() => modal.classList.add("show"), 10); // Adds fade effect
    });

    // Hide modal when clicking outside the content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
            setTimeout(() => modal.style.display = "none", 300);
        }
    });
});




// Modal Display function.
document.getElementById("createQuizBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById("createQuizModal").style.display = "flex";
});

document.getElementById("cancelBtn").addEventListener("click", function() {
    document.getElementById("createQuizModal").style.display = "none";
});






// edit quiz button function
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("createQuizModal1");
    const closeBtn = document.querySelector("#createQuizModal1 .close");
    const editQuizButton = document.getElementById("editQuizButton");
    const quizList = document.querySelector(".quiz-list"); // Container holding quizzes

    // ✅ Use event delegation for dynamically loaded quizzes
    quizList.addEventListener("click", function (event) {
        const quizItem = event.target.closest(".quiz-item");

        if (quizItem && !event.target.closest(".quiz-checkbox")) {
            openModal(quizItem);
        }
    });

    // ✅ Function to open modal with correct quiz ID
    function openModal(quizItem) {
        modal.style.display = "flex"; // Show modal
        const quizId = quizItem.dataset.quizId; // Get clicked quiz ID
        localStorage.setItem("selectedQuizId", quizId); // Store selected quiz ID
    }

    // ✅ Function to close modal
    function closeModal() {
        modal.style.display = "none"; // Hide modal
    }

    // ✅ Function to edit the selected quiz
    function editQuiz() {
        const quizId = localStorage.getItem("selectedQuizId");

        if (!quizId) {
            alert("No quiz selected!");
            return;
        }

        let allQuizzes = JSON.parse(localStorage.getItem("allSavedQuizzes")) || [];
        let selectedQuiz = allQuizzes.find(quiz => quiz.quizId === quizId);

        if (!selectedQuiz) {
            alert("Quiz not found!");
            return;
        }

        // ✅ Store quiz title and questions for editing
        localStorage.setItem("quizzes", JSON.stringify(selectedQuiz.questions));
        localStorage.setItem("quizTitle", selectedQuiz.title);

        // ✅ Redirect to Quiz Creation page with correct quiz ID
        window.location.href = `Quizcreation.php?quizId=${quizId}`;
    }

    // ✅ Attach event listeners for modal and edit button
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
        if (event.target === modal) closeModal();
    });

    editQuizButton.addEventListener("click", editQuiz);
});







// Names the Quiz
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("createQuizModal");
    const quizForm = document.getElementById("quizForm");
    const quizTitleInput = document.getElementById("quizTitle");
    const errorMessage = document.getElementById("error-message");
    const cancelBtn = document.getElementById("cancelBtn");

    // Function to handle form submission
    quizForm.addEventListener("submit", function (event) {
		console.log('Button clicked'); // Check if this appears
        event.preventDefault(); // Prevents page reload

        const quizTitle = quizTitleInput.value.trim();

        if (!quizTitle) {
            errorMessage.textContent = "⚠ Please enter a quiz title!";
            errorMessage.style.color = "red";
            return;
        }

        // Retrieve all saved quizzes
        let allQuizzes = JSON.parse(localStorage.getItem("allSavedQuizzes")) || [];

        // Check if quiz name already exists
        if (allQuizzes.some(quiz => quiz.title.toLowerCase() === quizTitle.toLowerCase())) {
            alert("⚠ This quiz name is already in use. Please choose a different name.");
            return;
        }

        // Save quiz title to localStorage
        localStorage.setItem("quizTitle", quizTitle);
        window.location.href = "Quizcreation.php"; // Redirect to the quiz creation page
    });

    // Reset error message when typing
    quizTitleInput.addEventListener("input", function () {
        errorMessage.textContent = ""; // Clears error message when user starts typing
    });

    // Close modal when clicking "Cancel"
    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
        errorMessage.textContent = ""; // Clears error when closing modal
    });
});









 
