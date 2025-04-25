document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const signupForm = document.getElementById('signup-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const termsCheckbox = document.getElementById('terms');
    const signupBtn = document.querySelector('.signup-btn');
    const bars = document.querySelectorAll('.bar');
    const strengthBar = document.querySelector('.strength-bar');
    
    // Animated background
    animateBackground();

    // Input animations
    animateInputs();

    // Password strength checker
    passwordInput.addEventListener('input', checkPasswordStrength);

    // Handle form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            shakeForm();
            return;
        }
        
        // Show loading animation
        signupBtn.classList.add('loading');
        signupBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(function() {
            signupBtn.classList.remove('loading');
            signupBtn.disabled = false;
            
            // Success animation
            successAnimation();
            
            // Redirect to home page
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 1000);
        }, 1500);
    });

    // Function to check password strength
    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        
        // Check password length
        if (password.length >= 8) {
            strength += 1;
        }
        
        // Check for lowercase and uppercase letters
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            strength += 1;
        }
        
        // Check for numbers
        if (password.match(/\d/)) {
            strength += 1;
        }
        
        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        }
        
        // Update the strength bar
        strengthBar.className = 'strength-bar';
        
        if (password.length === 0) {
            strengthBar.style.width = '0%';
        } else if (strength === 1) {
            strengthBar.classList.add('weak');
        } else if (strength === 2) {
            strengthBar.classList.add('medium');
        } else if (strength === 3) {
            strengthBar.classList.add('strong');
        } else if (strength >= 4) {
            strengthBar.classList.add('very-strong');
        }
    }

    // Function to validate form
    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (fullnameInput.value.trim() === '') {
            isValid = false;
            fullnameInput.classList.add('error');
        } else {
            fullnameInput.classList.remove('error');
        }
        
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
        }
        
        if (usernameInput.value.trim() === '') {
            isValid = false;
            usernameInput.classList.add('error');
        } else {
            usernameInput.classList.remove('error');
        }
        
        if (passwordInput.value.trim() === '' || passwordInput.value.length < 8) {
            isValid = false;
            passwordInput.classList.add('error');
        } else {
            passwordInput.classList.remove('error');
        }
        
        if (!termsCheckbox.checked) {
            isValid = false;
            termsCheckbox.parentElement.classList.add('error');
        } else {
            termsCheckbox.parentElement.classList.remove('error');
        }
        
        return isValid;
    }

    // Function to shake form on error
    function shakeForm() {
        signupForm.classList.add('shake');
        setTimeout(function() {
            signupForm.classList.remove('shake');
        }, 500);
    }

    // Function for success animation
    function successAnimation() {
        signupBtn.innerHTML = '<span>Account Created!</span>';
        signupBtn.style.background = '#10b981'; // Green color
        signupBtn.style.borderColor = '#10b981';
        
        // Increase bar height animation
        bars.forEach(bar => {
            bar.style.background = '#10b981';
            bar.style.height = `${Math.random() * 100 + 20}px`;
        });
    }

    // Function to animate visualizer bars
    function animateBackground() {
        // Initial animation of bars
        bars.forEach(bar => {
            const randomHeight = Math.random() * 40 + 5;
            bar.style.height = `${randomHeight}px`;
        });
    }

    // Function to animate input fields
    function animateInputs() {
        const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        
        inputFields.forEach(input => {
            // Create placeholder attribute for animation
            input.setAttribute('placeholder', ' ');
            
            // Focus effect
            input.addEventListener('focus', function() {
                const label = this.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.classList.add('active');
                }
                this.nextElementSibling.style.transform = 'scaleX(1)';
                this.nextElementSibling.style.background = '#60a5fa';
            });
            
            // Blur effect
            input.addEventListener('blur', function() {
                const label = this.previousElementSibling;
                if (this.value.trim() === '' && label && label.tagName === 'LABEL') {
                    label.classList.remove('active');
                }
                this.nextElementSibling.style.transform = 'scaleX(0.8)';
                this.nextElementSibling.style.background = '#475569';
            });
        });
    }

    // Enhance visualizer animation
    setInterval(() => {
        bars.forEach(bar => {
            const randomHeight = Math.random() * 40 + 5;
            bar.style.height = `${randomHeight}px`;
        });
    }, 1000);

    // Add glow effect animation to signup button
    setInterval(() => {
        const btnGlow = document.querySelector('.btn-glow');
        btnGlow.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            btnGlow.style.transition = 'all 1.5s ease';
            btnGlow.style.transform = 'translateX(100%)';
        }, 50);
        
        setTimeout(() => {
            btnGlow.style.transition = 'none';
        }, 1600);
    }, 3000);
    
    // Email validation visual feedback
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() !== '' && !emailRegex.test(this.value.trim())) {
            this.nextElementSibling.style.background = '#ef4444'; // Red color for invalid email
        } else if (this.value.trim() !== '') {
            this.nextElementSibling.style.background = '#10b981'; // Green color for valid email
        }
    });
});