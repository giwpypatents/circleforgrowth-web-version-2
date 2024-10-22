<?php
// Include the database connection file
include 'db.php';

// Handle the login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $circle_id = mysqli_real_escape_string($conn, $_POST['circle-id']);
    $password = $_POST['password'];

    // Check if the Circle ID exists
    $query = "SELECT * FROM users WHERE circle_id = '$circle_id'";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        
        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Start session and set user information if necessary
            session_start();
            $_SESSION['user_id'] = $user['circle_id']; // Optionally store user info in session

            echo json_encode([
                "status" => "success", 
                "message" => "Login successful! Welcome, " . $user['full_name'],
                "user" => [
                    "full_name" => $user['full_name'],
                    "business_name" => $user['business_name'], // Add this
                    "circle_id" => $user['circle_id'] // Add this
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password!"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No user found with this Circle ID!"]);
    }
}
?>
