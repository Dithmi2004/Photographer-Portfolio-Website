<?php
// Database connection
$servername = "localhost";
$username = "root"; // XAMPP default
$password = "";
$database = "wdd_project";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$full_name = $_POST['full_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$session_type = $_POST['session_type'];
$preferred_date = $_POST['preferred_date'];
$preferred_time = $_POST['preferred_time'];
$additional_info = isset($_POST['additional_info']) ? $_POST['additional_info'] : "";

// Prepare SQL
$sql = "INSERT INTO booking (full_name, email, phone, session_type, preferred_date, preferred_time, additional_info)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $full_name, $email, $phone, $session_type, $preferred_date, $preferred_time, $additional_info);

if ($stmt->execute()) {
    echo "<script>alert('Booking successful!'); window.location.href='booking.html';</script>";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
