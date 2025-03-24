function sendResetLink() {
    const emailInput = document.getElementById("email").value.trim();

    if (emailInput === "") {
        alert("⚠ Please enter your email address.");
        return;
    }

    const resetButton = document.querySelector(".reset-button");
    let timeLeft = 30; // Set countdown duration in seconds

    // Disable button and start countdown
    resetButton.disabled = true;
    resetButton.textContent = `Wait ${timeLeft}s`;

    const countdown = setInterval(() => {
        timeLeft--;

        if (timeLeft > 0) {
            resetButton.textContent = `Might take sometime please wait ${timeLeft}s`;
        } else {
            clearInterval(countdown);
            alert(`✅ Password reset link has been sent to ${emailInput}`);

            // Reset button text and enable it
            resetButton.textContent = "SEND RESET LINK";
            resetButton.disabled = false;
        }
    }, 1000); // Update every second
}

