document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const bars = document.querySelectorAll('.bar');

    animateBackground();

    animateInputs();

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            shakeForm();
            return;
        }
        
        // Show loading animation
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(function() {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;  
            
            // Success animation
            successAnimation();
            
            // Redirect to home page
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 1000);
        }, 1500);
    });

    // Function to validate form
    function validateForm() {
        let isValid = true;
        
        if (usernameInput.value.trim() === '') {
            isValid = false;
            usernameInput.classList.add('error');
        } else {
            usernameInput.classList.remove('error');
        }
        
        if (passwordInput.value.trim() === '') {
            isValid = false;
            passwordInput.classList.add('error');
        } else {
            passwordInput.classList.remove('error');
        }
        
        return isValid;
    }

    // Function to shake form on error
    function shakeForm() {
        loginForm.classList.add('shake');
        setTimeout(function() {
            loginForm.classList.remove('shake');
        }, 500);
    }

    // Function for success animation
    function successAnimation() {
        loginBtn.innerHTML = '<span>Success!</span>';
        loginBtn.style.background = '#10b981'; // Green color
        loginBtn.style.borderColor = '#10b981';
        
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
        const inputFields = document.querySelectorAll('input[type="text"], input[type="password"]');
        
        inputFields.forEach(input => {
            // Create placeholder attribute for animation
            input.setAttribute('placeholder', ' ');
            
            // Focus effect
            input.addEventListener('focus', function() {
                this.previousElementSibling.classList.add('active');
                this.nextElementSibling.style.transform = 'scaleX(1)';
                this.nextElementSibling.style.background = '#60a5fa';
            });
            
            // Blur effect
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.previousElementSibling.classList.remove('active');
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

    // Add glow effect animation to login button
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
});