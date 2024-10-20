document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for the text display
    const typingTexts = [
        "Grow your business",
        "Expand your network",
        "Reach more markets",
        "Get technical support",
        "Get financial support",
        "Join Circle"
    ];
    let textIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenTexts = 2000;
    const typingTextElement = document.getElementById('typing-text');

    function typeText() {
        if (charIndex < typingTexts[textIndex].length) {
            typingTextElement.textContent += typingTexts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(deleteText, delayBetweenTexts);
        }
    }

    function deleteText() {
        if (charIndex > 0) {
            typingTextElement.textContent = typingTextElement.textContent.slice(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteText, deletingSpeed);
        } else {
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(typeText, typingSpeed);
        }
    }

    setTimeout(typeText, typingSpeed); // Start the typing effect

    // Modal functionality
    const signInButton = document.getElementById('sign-in-button');
    const signInModal = document.getElementById('sign-in-modal');
    const closeSignIn = signInModal.querySelector('.close');

    const registerLink = document.getElementById('register-link');
    const registerModal = document.getElementById('register-modal');
    const closeRegister = registerModal.querySelector('.close');
    const backToSignInLink = document.getElementById('back-to-signin');

    // Show the Sign In modal
    signInButton.addEventListener('click', function(e) {
        e.preventDefault();
        signInModal.style.display = 'block';
    });

    // Close the Sign In modal
    closeSignIn.addEventListener('click', function() {
        signInModal.style.display = 'none';
    });

    // Open the Register modal from Sign In
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        signInModal.style.display = 'none';
        registerModal.style.display = 'block';
    });

    // Close the Register modal
    closeRegister.addEventListener('click', function() {
        registerModal.style.display = 'none';
    });

    // Go back to Sign In from Register
    backToSignInLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        signInModal.style.display = 'block';
    });

    // Close modals when clicking outside of modal content
    window.addEventListener('click', function(e) {
        if (e.target === signInModal) {
            signInModal.style.display = 'none';
        } else if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Front-end form validation for registration
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        const fullName = document.getElementById('name').value;
        const businessName = document.getElementById('business').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (!fullName || !email || !phoneNumber || !password) {
            e.preventDefault(); // Stop form submission
            alert('Please fill out all required fields (Full Name, Email, Phone Number, and Password).');
        }

        // You can add more specific validation if needed (e.g., email format, phone format, etc.)
    });
});
