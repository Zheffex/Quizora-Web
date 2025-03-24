document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = slider.children;
    const totalSlides = slides.length;
    let index = 0;
    const interval = 3000; // Change slide every 3 seconds

    function showNextSlide() {
        index = (index + 1) % totalSlides;
        slider.scrollTo({
            left: slider.clientWidth * index,
            behavior: 'smooth'
        });
    }

    setInterval(showNextSlide, interval);

    // Prevent default action on slider-nav links & enable manual click
    const navLinks = document.querySelectorAll('.slider-nav a');
    navLinks.forEach((link, idx) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            index = idx; // Set index to clicked dot
            slider.scrollTo({
                left: slider.clientWidth * index,
                behavior: 'smooth'
            });
        });
    });
});






// modal Function
document.addEventListener("DOMContentLoaded", function () {
    const quizzes = document.querySelectorAll(".quiz");
    const modal = document.getElementById("quizModal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    // ✅ Open Modal When Clicking on a Quiz
    quizzes.forEach(quiz => {
        quiz.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            
            let title = quiz.dataset.title;
            let img = quiz.dataset.img;
            let desc = quiz.dataset.desc;

            modalTitle.textContent = title;
            modalImage.src = img;
            modalDescription.textContent = desc;

            modal.style.display = "flex"; // Show modal
        });
    });

    // ✅ Close Modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // ✅ Close Modal When Clicking Outside of It
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
