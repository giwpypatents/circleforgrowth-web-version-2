<?php
// Include the database connection file
include 'db.php';

// Function to generate a 6-digit Circle ID
function generateCircleId() {
    return str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
}

// Handle the form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $full_name = mysqli_real_escape_string($conn, $_POST['name']);
    $business_name = mysqli_real_escape_string($conn, $_POST['business']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone_number = mysqli_real_escape_string($conn, $_POST['phone']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password
    
    // Check if the email already exists in the database
    $check_email_query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $check_email_query);
    
    if (mysqli_num_rows($result) > 0) {
        echo "Email already exists! Please use a different email.";
    } else {
        // Generate a unique Circle ID
        do {
            $circle_id = generateCircleId();
            $check_circle_id_query = "SELECT * FROM users WHERE circle_id = '$circle_id'";
            $result = mysqli_query($conn, $check_circle_id_query);
        } while (mysqli_num_rows($result) > 0); // Ensure the Circle ID is unique
        
        // Insert the new user data into the database
        $insert_query = "INSERT INTO users (full_name, business_name, email, phone_number, password, circle_id) 
                         VALUES ('$full_name', '$business_name', '$email', '$phone_number', '$password', '$circle_id')";
                         
        if (mysqli_query($conn, $insert_query)) {
            echo "Registration successful! Your Circle ID is: $circle_id";
        } else {
            echo "Error: " . mysqli_error($conn); // Debugging line
        }
    }
}
?>
