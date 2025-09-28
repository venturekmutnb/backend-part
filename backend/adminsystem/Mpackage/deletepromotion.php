<?php
require "../../database.php"; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $promo_id = $_POST['promo_id'] ?? null;

    if ($promo_id) {
        $stmt = $conn->prepare("DELETE FROM promotion WHERE promo_id = ?");
        $stmt->bind_param("i", $promo_id);

        if ($stmt->execute()) {
            echo "Promotion deleted successfully";
        } else {
            echo "Failed to delete promotion";
        }

        $stmt->close();
    } else {
        echo "Invalid promo_id";
    }
}

$conn->close();
