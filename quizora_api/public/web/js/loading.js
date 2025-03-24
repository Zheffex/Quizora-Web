//QUIZ NAME //QUIZCREATION
document.addEventListener("DOMContentLoaded", function () {
    const quizTitle = localStorage.getItem("quizTitle"); // Get stored title
    const quizTitleElement = document.querySelector(".quiz-title");

    if (quizTitle) {
        quizTitleElement.textContent = quizTitle; // Update the title in header
    }
});



// this connects the Edit Quiz inside Create.
//
document.addEventListener("DOMContentLoaded", function () {
    const currentQuizId = localStorage.getItem("currentEditingQuiz");
    if (!currentQuizId) return; // No quiz selected

    let savedQuizzes = JSON.parse(localStorage.getItem("allSavedQuizzes")) || [];
    let quizToEdit = savedQuizzes.find(quiz => quiz.quizId === currentQuizId);

    if (quizToEdit) {
        document.querySelector(".quiz-title").textContent = quizToEdit.title; // Set quiz title

        // ✅ Load Questions into UI
        const questionList = document.querySelector(".quiz-list");
        questionList.innerHTML = ""; // Clear previous questions

        quizToEdit.questions.forEach((question, index) => {
            const questionItem = document.createElement("div");
            questionItem.classList.add("quiz-item");
            questionItem.innerHTML = `
                <div class="Quiz-name-container">
                    <h4 class="quiz-counter">${index + 1}.</h4>
                    <h3 class="question-placer">${question.questionText}</h3>
                </div>
                <div class="quiz-choices">
                    <p class="right-answer-holder">Right Answer: ${question.answerText}</p>
                    <p class="points-holder">Points: ${question.points || "0"}</p>
                    <p class="time-holder">Time: ${question.time || "No Timer"}</p>
                    <button class="edit-question-btn">Edit</button>
                </div>
            `;
            questionList.appendChild(questionItem);
        });
    }
});






// save button
// 
document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-quiz-progress");

    if (saveButton) {
        saveButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevents navigation

            let quizTitle = document.querySelector(".quiz-title").textContent.trim();
            let savedQuizzes = JSON.parse(localStorage.getItem("allSavedQuizzes")) || [];
            let savedQuestions = JSON.parse(localStorage.getItem("quizzes")) || [];
            let selectedQuizId = localStorage.getItem("selectedQuizId"); // Get the quiz ID if editing

            if (savedQuestions.length === 0) {
                alert("⚠️ Please add at least one question before saving.");
                return;
            }

            if (selectedQuizId) {
                // ✅ If editing an existing quiz, update it
                let existingQuiz = savedQuizzes.find(quiz => quiz.quizId === selectedQuizId);
                if (existingQuiz) {
                    existingQuiz.title = quizTitle || "Untitled Quiz";
                    existingQuiz.questionCount = savedQuestions.length;
                    existingQuiz.questions = savedQuestions;
                }
            } else {
                // ✅ If creating a new quiz, generate a new ID and save it
                const newQuizId = Date.now().toString();
                let quizData = {
                    quizId: newQuizId,
                    title: quizTitle || "Untitled Quiz",
                    questionCount: savedQuestions.length,
                    questions: savedQuestions
                };
                savedQuizzes.push(quizData);
            }

            // ✅ Save the updated quizzes list
            localStorage.setItem("allSavedQuizzes", JSON.stringify(savedQuizzes));

            // ✅ Clear temporary quiz progress after saving
            localStorage.removeItem("quizzes");
            localStorage.removeItem("selectedQuizId"); // Reset selected quiz

            // ✅ Redirect to create.html
            window.location.href = "create.html";
        });
    }
});
















// back button
// 
document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.querySelector(".quiz-header a[href='create.html']");

    if (backButton) {
        backButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevents immediate navigation

            const userChoice = confirm("Are you sure you want to leave?\n\nClick 'OK' to discard changes or 'Cancel' to continue editing.");

            if (userChoice) { 
                localStorage.removeItem("quizzes"); // ✅ Clears progress
                window.location.href = "create.html"; // ✅ Redirects to create page
            }
        });
    }
});












// // // loads Quiz Creations part when CLICKING // maybe duplicate
// document.addEventListener("DOMContentLoaded", function () {
//     const quizList = document.querySelector(".quiz-list");

//     function loadQuizzes() {
//         if (!quizList) return;

//         quizList.innerHTML = ""; // Clear existing items
//         let savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

//         // ✅ Filter out quizzes with no content
//         savedQuizzes = savedQuizzes.filter(quiz => quiz.questionText.trim() !== "" && quiz.answerText.trim() !== "");

//         if (savedQuizzes.length === 0) {
//             quizList.innerHTML = `<p class="no-quiz-message">No quizzes available. Add a question first.</p>`;
//             localStorage.setItem("quizzes", JSON.stringify([])); // Ensure only valid quizzes are saved
//             return;
//         }

//         // Loop through filtered quizzes and display them
//         savedQuizzes.forEach((quiz, index) => {
//             const quizItem = document.createElement("div");
//             quizItem.classList.add("quiz-item");
//             quizItem.dataset.question = quiz.questionText; // Store question for removal tracking
//             quizItem.innerHTML = `
//                 <div class="Quiz-name-container">
//                     <h4 class="quiz-counter">${index + 1}.</h4>
//                     <h3 class="question-placer">${quiz.questionText}</h3>
//                     <input type="checkbox" class="quiz-select-checkbox">
//                 </div>
//                 <div class="quiz-choices">
//                     <p class="right-answer-holder">Right Answer: ${quiz.answerText}</p>
//                     <p class="points-holder">Points: ${quiz.points || "0"}</p>
//                     <p class="time-holder">Time: ${quiz.time || "No Timer"}</p>
//                     <button class="edit-question-btn">
//                         <i class="fa-solid fa-pen"></i> Edit
//                     </button>
//                 </div>
//             `;
//             quizList.appendChild(quizItem);
//         });

//         // ✅ Save only valid quizzes back to `localStorage`
//         localStorage.setItem("quizzes", JSON.stringify(savedQuizzes));
//     }

//     loadQuizzes();
// });








// Remove button and also shows the Quiz made
// 
// 
document.addEventListener("DOMContentLoaded", function () {
    const quizList = document.querySelector(".quiz-list");
    const deleteButton = document.getElementById("delete-button");

    function loadQuizzes() {
        if (!quizList) return;

        quizList.innerHTML = ""; // Clear existing items
        let savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

        if (savedQuizzes.length === 0) {
            return; // No alert, just an empty state
        }

        savedQuizzes.forEach((quiz, index) => {
            const quizItem = document.createElement("div");
            quizItem.classList.add("quiz-item");
            quizItem.innerHTML = `
                <div class="Quiz-name-container">
                    <h4 class="quiz-counter">${index + 1}.</h4>
                    <h3 class="question-placer">${quiz.questionText || "No Question"}</h3>
                    <input type="checkbox" class="quiz-select-checkbox">
                </div>
                <div class="quiz-choices">
                    <p class="right-answer-holder">Right Answer: ${quiz.answerText || "Not Provided"}</p>
                    <p class="points-holder">Points: ${quiz.points || "0"}</p>
                    <p class="time-holder">Time: ${quiz.time || "No Timer"}</p>
                    <p class="question-type-holder">Type: ${quiz.questionType || "Not Specified"}</p> <!-- ✅ Shows question type -->
                    <button class="edit-question-btn">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                </div>
            `;
            quizList.appendChild(quizItem);
        });
    }

    loadQuizzes(); // Load quizzes when the page is opened


    // ✅ DELETE FUNCTION (Removes selected quizzes)
    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            const checkboxes = document.querySelectorAll(".quiz-select-checkbox:checked");

            if (checkboxes.length === 0) {
                alert("⚠️ Please select at least one quiz to remove.");
                return;
            }

            if (confirm("Are you sure you want to delete the selected quizzes?")) {
                let savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

                checkboxes.forEach(checkbox => {
                    const quizItem = checkbox.closest(".quiz-item");
                    const questionText = quizItem.querySelector(".question-placer").textContent.trim();

                    // ✅ Remove from localStorage
                    savedQuizzes = savedQuizzes.filter(quiz => quiz.questionText !== questionText);

                    // ✅ Remove from the DOM
                    quizItem.remove();
                });

                // ✅ Save updated quizzes to localStorage
                localStorage.setItem("quizzes", JSON.stringify(savedQuizzes));

                // ✅ Reload the quizzes and update counters
                loadQuizzes();
            }
        });
    }
});















// QUIZ ADD FUNCTION
// 
// 
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("Add-button");

    addButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents navigation unless valid

        // Get the selected question type
        const selectedType = document.querySelector(".dropdown .dropdown-btn span")?.textContent || "Multiple Choice";

        // Get input values
        let questionText = "";
        let answerText = "";
        let points = document.querySelector(".points-dropdown .dropdown-btn span")?.textContent || "0";
        let time = document.querySelector(".timer-dropdown .dropdown-btn span")?.textContent || "No Timer";

        if (selectedType === "Multiple Choice") {
            questionText = document.querySelector("#Multiple-Choice .question-box").value.trim();
            let selectedRadio = document.querySelector("#Multiple-Choice input[type='radio']:checked");
            let answerInputs = document.querySelectorAll("#Multiple-Choice .answer-box input[type='text']");

            answerText = selectedRadio ? selectedRadio.previousElementSibling.value.trim() : "";

            // Ensure all answer options are filled
            let allAnswersFilled = [...answerInputs].every(input => input.value.trim() !== "");
            if (!allAnswersFilled) {
                alert("⚠️ Please fill in all answer options before adding.");
                return;
            }
        } 
        else if (selectedType === "Fill in the Blank") {
            questionText = document.querySelector("#Fill-in-the-Blank .question-box").value.trim();
            answerText = document.querySelector("#Fill-in-the-Blank .answer-box input").value.trim();
        } 
        else if (selectedType === "True or False") {
            questionText = document.querySelector("#True-False .question-box").value.trim();
            answerText = document.querySelector("#True-False input[type='radio']:checked")?.value || "";
            
            if (!answerText) {
                alert("⚠️ Please select True or False as the correct answer.");
                return;
            }
        } 
        else if (selectedType === "Open Ended Question") {
            questionText = document.querySelector("#open-ended-container .question-box").value.trim();
            answerText = document.querySelector("#open-ended-container .answer-box textarea").value.trim();
        }

        // ✅ Validation: Ensure all fields are filled
        let missingFields = [];
        if (!questionText) missingFields.push("Question");
        if (!answerText) missingFields.push("Correct Answer");
        if (!points || points === "Select Points") missingFields.push("Points");
        if (!time || time === "Select Time") missingFields.push("Time");

        if (missingFields.length > 0) {
            alert(`⚠️ Please fill in the following fields before adding: ${missingFields.join(", ")}`);
            return;
        }

        let savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        savedQuizzes.push({ questionText, answerText, points, time, questionType: selectedType });
        localStorage.setItem("quizzes", JSON.stringify(savedQuizzes));

        // ✅ Stay on the page, don't redirect
        window.location.href = "Quizcreation.html";

    });
});














// ✅ Function to store selected question type & redirect //QUIZCREATION
function setQuestionType(type) {
    localStorage.setItem("selectedQuestionType", type); // Store selected type
    window.location.href = "EditQuestion.html"; // Redirect to edit page
}

// ✅ Loads the correct quiz layout on EditQuestion.html
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "EditQuestion.html") {
        const selectedType = localStorage.getItem("selectedQuestionType") || "Multiple Choice";

        // Hide all layouts initially
        document.querySelectorAll(".quiz-containers").forEach(container => {
            container.style.display = "none";
        });

        // Map question types to corresponding layout IDs
        const layoutIdMap = {
            "Multiple Choice": "Multiple-Choice",
            "Fill in the Blank": "Fill-in-the-Blank",
            "True or False": "True-False",
            "Open Ended Question": "open-ended-container"
        };

        // Display the correct layout
        const selectedLayout = document.getElementById(layoutIdMap[selectedType]);
        if (selectedLayout) {
            selectedLayout.style.display = "block";
        }
    }
});



















// loading screen function //EDITQUESTION
window.addEventListener("load", function () {
    // Check if page was refreshed
    if (performance.navigation.type === 1) { 
        // Type 1 means page was reloaded
        document.getElementById("loading-screen").style.display = "none";
        document.querySelector(".content").style.display = "block";
        return; // Exit function to prevent loading screen from showing
    }

    // Keep the loading screen for 2.4 seconds
    setTimeout(function () {
        document.getElementById("loading-screen").style.display = "none";
        document.querySelector(".content").style.display = "block";
    }, 1500);

    if (sessionStorage.getItem("fromEditQuestion")) {
        sessionStorage.removeItem("fromEditQuestion"); // Remove flag
        document.getElementById("loading-screen").style.display = "none";
        document.querySelector(".content").style.display = "block";
    } else {
        // Show loading screen only when first entering editquestion.html
        document.getElementById("loading-screen").style.display = "block";
        document.querySelector(".content").style.display = "none";
    }
});

// When clicking back, prevent loading screen on return
document.getElementById("back-button").addEventListener("click", function() {
    sessionStorage.setItem("fromEditQuestion", "true");
});















//for POINTS //EDITQUESTION
document.addEventListener("DOMContentLoaded", function () {
    const pointsDropdown = document.querySelector(".points-dropdown");
    const pointsButton = pointsDropdown.querySelector(".dropdown-btn");
    const pointsMenu = pointsDropdown.querySelector(".dropdown-menu");
    const pointsItems = pointsDropdown.querySelectorAll(".dropdown-item");

    // Toggle dropdown menu when button is clicked
    pointsButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent closing when clicking inside
        pointsDropdown.classList.toggle("open");
    });

    // Select a point value when an item is clicked
    pointsItems.forEach(item => {
        item.addEventListener("click", function () {
            pointsButton.querySelector("span").textContent = this.textContent; // Update button text
            pointsDropdown.classList.remove("open"); // Close dropdown
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!pointsDropdown.contains(event.target)) {
            pointsDropdown.classList.remove("open");
        }
    });
});













//drop down function for Question type //EDITQUESTION
document.addEventListener("DOMContentLoaded", function () {
    function setupDropdown(dropdownSelector) {
        const dropdown = document.querySelector(dropdownSelector);
        if (!dropdown) return;

        const button = dropdown.querySelector(".dropdown-btn");
        const menu = dropdown.querySelector(".dropdown-menu");
        const items = menu.querySelectorAll(".dropdown-item");

        // Map question types to their respective layouts
        const layouts = {
            "Multiple Choice": document.getElementById("Multiple-Choice"),
            "Fill in the Blank": document.getElementById("Fill-in-the-Blank"),
            "True or False": document.getElementById("True-False"),
            "Open Ended Question": document.getElementById("open-ended-container")
        };

        // Function to hide all layouts
        function hideAllLayouts() {
            Object.values(layouts).forEach(layout => {
                if (layout) layout.style.display = "none";
            });
        }

        // Show previously selected layout (if stored in localStorage)
        const selectedType = localStorage.getItem("selectedQuestionType");
        if (selectedType && layouts[selectedType]) {
            hideAllLayouts();
            layouts[selectedType].style.display = "block";
            button.querySelector("span").textContent = selectedType;
        } else {
            hideAllLayouts(); // Hide everything by default
        }

        // Dropdown toggle
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdown.classList.toggle("open");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("open");
            }
        });

        // Handle dropdown item selection
        items.forEach(item => {
            item.addEventListener("click", function () {
                const selectedText = this.querySelector("span").textContent;
                button.querySelector("span").textContent = selectedText;

                // Hide all layouts
                hideAllLayouts();

                // Show only the selected layout
                if (layouts[selectedText]) {
                    layouts[selectedText].style.display = "block";
                }

                // Save selection in localStorage
                localStorage.setItem("selectedQuestionType", selectedText);

                dropdown.classList.remove("open");
            });
        });
    }

    setupDropdown(".dropdown"); // Initialize dropdown
});

    
    



// loads the question inside Edit quiz of create modal
document.addEventListener("DOMContentLoaded", function () {
    let savedQuestions = JSON.parse(localStorage.getItem("quizzes")) || [];

    if (savedQuestions.length > 0) {
        const questionContainer = document.querySelector(".quiz-list"); // Adjust to your HTML

        questionContainer.innerHTML = ""; // Clear previous content

        savedQuestions.forEach((question, index) => {
            const questionItem = document.createElement("div");
            questionItem.classList.add("quiz-item");
            questionItem.innerHTML = `
                <div class="question-box">
                    <h4>Question ${index + 1}:</h4>
                    <p>${question.questionText}</p>
                    <p><strong>Answer:</strong> ${question.answerText}</p>
                    <p><strong>Points:</strong> ${question.points}</p>
                    <p><strong>Time Limit:</strong> ${question.time}</p>
                </div>
            `;
            questionContainer.appendChild(questionItem);
        });
    }
});



    
    