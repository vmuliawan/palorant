document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reportForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const serverSelect = document.getElementById('server');
    const descriptionTextarea = document.getElementById('description');
    const imageInput = document.getElementById('report-img');
    const agreeCheckbox = document.getElementById('agree');
    const previewImage = document.getElementById('preview');
    const descCounter = document.getElementById('descCounter');

    // Character counter for description
    descriptionTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        descCounter.textContent = `${currentLength}/300 characters`;
        
        if (currentLength > 300) {
            descCounter.style.color = '#e74c3c';
        } else {
            descCounter.style.color = 'var(--text-color)';
        }
    });

    // Image preview
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            previewImage.style.display = 'none';
        }
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate username
        if (usernameInput.value.trim() === '') {
            showError(usernameInput, 'usernameError', 'Username is required');
            isValid = false;
        } else if (usernameInput.value.trim().length < 3) {
            showError(usernameInput, 'usernameError', 'Username must be at least 3 characters');
            isValid = false;
        } else {
            showSuccess(usernameInput, 'usernameError');
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'emailError', 'Please enter a valid email');
            isValid = false;
        } else {
            showSuccess(emailInput, 'emailError');
        }

        // Validate server
        if (serverSelect.value === '') {
            showError(serverSelect, 'serverError', 'Please select a server');
            isValid = false;
        } else {
            showSuccess(serverSelect, 'serverError');
        }

        // Validate description
        if (descriptionTextarea.value.trim() === '') {
            showError(descriptionTextarea, 'descriptionError', 'Description is required');
            isValid = false;
        } else if (descriptionTextarea.value.length > 300) {
            showError(descriptionTextarea, 'descriptionError', 'Description must be 300 characters or less');
            isValid = false;
        } else {
            showSuccess(descriptionTextarea, 'descriptionError');
        }

        // Validate image (optional)
        const file = imageInput.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                showError(imageInput, 'imageError', 'Please upload a valid image (JPEG, PNG, GIF)');
                isValid = false;
            } else if (file.size > 2 * 1024 * 1024) { // 2MB
                showError(imageInput, 'imageError', 'Image must be less than 2MB');
                isValid = false;
            } else {
                showSuccess(imageInput, 'imageError');
            }
        }

        // Validate agreement
        if (!agreeCheckbox.checked) {
            showError(agreeCheckbox, 'agreeError', 'You must agree to the terms and conditions');
            isValid = false;
        } else {
            showSuccess(agreeCheckbox, 'agreeError');
        }

        if (isValid) {
            // Form is valid, you can submit it or perform AJAX request
            alert('Form submitted successfully!');
            form.reset();
            previewImage.style.display = 'none';
            descCounter.textContent = '0/300 characters';
            
            // Reset all success states
            const inputs = [usernameInput, emailInput, serverSelect, descriptionTextarea, imageInput, agreeCheckbox];
            inputs.forEach(input => {
                if (input.type !== 'checkbox' && input.type !== 'file') {
                    input.classList.remove('valid');
                }
            });
        }
    });

    function showError(input, errorElementId, message) {
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        if (input.type !== 'checkbox' && input.type !== 'file') {
            input.classList.remove('valid');
            input.classList.add('invalid');
            
            // Trigger reflow to restart animation
            void input.offsetWidth;
        }
    }

    function showSuccess(input, errorElementId) {
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        
        if (input.type !== 'checkbox' && input.type !== 'file') {
            input.classList.remove('invalid');
            input.classList.add('valid');
            
            // Trigger reflow to restart animation
            void input.offsetWidth;
        }
    }

    // Add focus animations
    const inputs = [usernameInput, emailInput, serverSelect, descriptionTextarea, imageInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--secondary-color)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.classList.contains('invalid')) {
                this.style.borderColor = '#ddd';
            }
        });
    });
});