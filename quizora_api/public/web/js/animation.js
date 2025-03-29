// quizora_api/public/web/js/animation.js
document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.querySelector(".main-content");

    if (mainContent) {
        setTimeout(() => {
            mainContent.classList.add("show");
        }, 150); // Small delay for smooth effect
    }
});

