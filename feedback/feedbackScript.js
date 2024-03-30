document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentInput = document.getElementById('improvement');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const previewDiv = document.getElementById('preview');
    const confirmationDiv = document.getElementById('confirmation');

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous error messages
        clearErrorMessages();

        // Validate form inputs
        let isValid = true;
        if (nameInput.value.trim() === '') {
            displayErrorMessage('name', 'Name is required');
            isValid = false;
        }
        if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
            displayErrorMessage('email', 'Invalid email format');
            isValid = false;
        }
        if (commentInput.value.trim() === '') {
            displayErrorMessage('comment', 'Comment is required');
            isValid = false;
        }
        let ratingValue = '';
        ratingInputs.forEach(input => {
            if (input.checked) {
                ratingValue = input.value;
            }
        });

        if (ratingValue === '') {
            displayErrorMessage('rating', 'Please select a rating');
            isValid = false;
        }

        // Check if the user found the website informative and easy to navigate through
        const convYesInput = document.getElementById('yes-conv');
        if (convYesInput && convYesInput.checked) {
            // If yes, set a default value for the comment field
            commentInput.value = "I am satisfied with the website";

            // Remove error message for this question
            const convErrorMessage = document.getElementById('conv-error');
            if (convErrorMessage) {
                convErrorMessage.textContent = ''; // Clear error message
            }
        } else {
            // If the user didn't find the website informative, mark the form as invalid
            isValid = false;
        }

        if (isValid) {
            // Store form data in sessionStorage
            sessionStorage.setItem('feedbackData', JSON.stringify({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                rating: ratingValue,
                comment: commentInput.value.trim()
            }));

            // Display preview
            displayPreview();
        }
    });

    function isValidEmail(email) {
        // Simple email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayErrorMessage(inputName, message) {
        const errorMessageElement = document.getElementById(`${inputName}-error`);
        errorMessageElement.textContent = message;
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errorMessage => {
            errorMessage.textContent = '';
        });
    }

    function displayPreview() {
        previewDiv.textContent = ''; // Clear existing content
        const feedbackData = JSON.parse(sessionStorage.getItem('feedbackData'));
        if (feedbackData) {
            const { name, email, rating, comment } = feedbackData;
            previewDiv.innerHTML = `
                <h2>Preview:</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Rating:</strong> ${rating}</p>
                <p><strong>Comment:</strong> ${comment}</p>
                <button id="edit-button">Edit</button>
                <button id="submit-button">Submit</button>
            `;

            // Add event listener for edit button
            const editButton = document.getElementById('edit-button');
            editButton.addEventListener('click', function() {
                previewDiv.textContent = ''; // Clear preview
            });

            // Add event listener for submit button
            const submitButton = document.getElementById('submit-button');
            submitButton.addEventListener('click', function() {
                // Here you can implement sending the form data via email
                // For demo purposes, we'll display a confirmation message
                confirmationDiv.textContent = 'Feedback submitted successfully!';
            });
        }
    }
});
