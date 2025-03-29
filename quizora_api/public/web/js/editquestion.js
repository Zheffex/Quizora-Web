// quizora_api/public/web/js/editquestion.js

//for Timer //EDIT QUESTION
document.addEventListener("DOMContentLoaded", function () {
    const timerDropdown = document.querySelector(".timer-dropdown");
    const timerButton = timerDropdown.querySelector(".dropdown-btn");
    const timerMenu = timerDropdown.querySelector(".dropdown-menu");
    const timerItems = timerDropdown.querySelectorAll(".dropdown-item");

    // Toggle dropdown menu when button is clicked
    timerButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent closing when clicking inside
        timerDropdown.classList.toggle("open");
    });

    // Select a timer value when an item is clicked
    timerItems.forEach(item => {
        item.addEventListener("click", function () {
            timerButton.querySelector("span").textContent = this.textContent; // Update button text
            timerDropdown.classList.remove("open"); // Close dropdown
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!timerDropdown.contains(event.target)) {
            timerDropdown.classList.remove("open");
        }
    });
});




//MULTIPLE CHOICE SINGLE CORRECT ANSWER//EDIT QUESTION
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".correct-btn");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                // Uncheck all other checkboxes
                checkboxes.forEach((cb) => {
                    if (cb !== this) cb.checked = false;
                });
            }
        });
    });
});


//TRUE OR FALSE //EDITQUESTION
function selectAnswer(optionId) {
    // Get both labels
    const trueLabel = document.getElementById("true-label");
    const falseLabel = document.getElementById("false-label");

    

    // Set the selected option as checked
    document.getElementById(optionId).checked = true;

    // Change the background color of the selected option
    document.getElementById(optionId + "-label").style.backgroundColor = "#2CA6A6"; // Green
}

