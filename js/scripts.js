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

    // Profile Modal
    const profileModal = document.getElementById('profile-modal');
    const closeProfile = profileModal.querySelector('.close');
    const profileName = document.getElementById('profile-name');
    const profileBusiness = document.getElementById('profile-business');
    const profileCircleId = document.getElementById('profile-circle-id');

    // Check login state on page load
    function checkLoginState() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            signInButton.textContent = 'Profile'; // Change button to Profile
            signInButton.href = "#"; // Prevent link change
        } else {
            signInButton.textContent = 'Sign In'; // Reset button to Sign In
            signInButton.href = "#"; // Reset link
        }
    }

    // Initial check for login state
    checkLoginState();

    // Show the Sign In modal
    signInButton.addEventListener('click', function(e) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            showProfileModal();
        } else {
            e.preventDefault();
            signInModal.style.display = 'block';
        }
    });

    // Function to show profile modal
    function showProfileModal() {
        profileName.textContent = localStorage.getItem('userName'); // Assuming userName is stored in localStorage
        profileBusiness.textContent = localStorage.getItem('userBusiness'); // Get business name
        profileCircleId.textContent = localStorage.getItem('userCircleId'); // Get Circle ID
        profileModal.style.display = 'block';
    }

    // Close the Sign In modal
    closeSignIn.addEventListener('click', function() {
        signInModal.style.display = 'none';
    });

    // Open the Register modal from Sign In
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        signInModal.style.display = 'none'; // Close Sign In modal
        registerModal.style.display = 'block'; // Open Register modal
    });

    // Close the Register modal
    closeRegister.addEventListener('click', function() {
        registerModal.style.display = 'none';
    });

    // Go back to Sign In from Register
    backToSignInLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none'; // Close Register modal
        signInModal.style.display = 'block'; // Open Sign In modal
    });

    // Close modals when clicking outside of modal content
    window.addEventListener('click', function(e) {
        if (e.target === signInModal) {
            signInModal.style.display = 'none';
        } else if (e.target === registerModal) {
            registerModal.style.display = 'none';
        } else if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // Handle form submissions
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        const formData = new FormData(this);

        fetch('signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Alert registration success or error
            if (data.includes("Registration successful")) {
                // Optionally redirect or close modal
                registerModal.style.display = 'none';
                signInModal.style.display = 'block'; // Show Sign In modal after registration
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        const formData = new FormData(this);

        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                localStorage.setItem('isLoggedIn', 'true'); // Set login status
                localStorage.setItem('userName', data.user.full_name); // Store user name
                localStorage.setItem('userBusiness', data.user.business_name); // Store business name
                localStorage.setItem('userCircleId', data.user.circle_id); // Store Circle ID
                checkLoginState(); // Update the navigation bar
                alert(data.message); // Alert login success
                signInModal.style.display = 'none'; // Close Sign In modal
                window.location.href = "index.html"; // Redirect to home
            } else {
                alert(data.message); // Alert error message
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Close the Profile modal
    closeProfile.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });

    // Handle sign out
    document.getElementById('sign-out-button').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn'); // Clear login status
        localStorage.removeItem('userName'); // Clear user name if stored
        localStorage.removeItem('userBusiness'); // Clear business name if stored
        localStorage.removeItem('userCircleId'); // Clear Circle ID if stored
        checkLoginState(); // Update the navigation bar
        alert("You have successfully signed out.");
        profileModal.style.display = 'none'; // Close the Profile modal
    });
});
