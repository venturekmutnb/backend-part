<?php
require "../../database.php";
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { echo "method"; exit; }

$pid = intval($_POST['package_id']);
$title = $_POST['title'] ?? '';
$destination = $_POST['destination'] ?? '';
$duration_days = intval($_POST['duration_days'] ?? 0);
$travel_date = $_POST['travel_date'] ?? null;
$price = floatval($_POST['price'] ?? 0);
$available_seats = intval($_POST['available_seats'] ?? 0);
$description = $_POST['description'] ?? '';

// handle image (optional)
if (!empty($_FILES['image']['name'])) {
  $uploads = __DIR__ . 'packagepics/';
  $name = time() . '_' . basename($_FILES['image']['name']);
  $target = $uploads . $name;
  if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
    $imagePath = 'packagepics/' . $name;
    $stmt = $conn->prepare("UPDATE package SET title=?, description=?, image_url=?, destination=?, duration_days=?, travel_date=?, price=?, available_seats=? WHERE package_id=?");
    $stmt->bind_param("sssssiddi", $title, $description, $imagePath, $destination, $duration_days, $travel_date, $price, $available_seats, $pid);
  }
} else {
  $stmt = $conn->prepare("UPDATE package SET title=?, description=?, destination=?, duration_days=?, travel_date=?, price=?, available_seats=? WHERE package_id=?");
  $stmt->bind_param("ssssiddi", $title, $description, $destination, $duration_days, $travel_date, $price, $available_seats, $pid);
}

if ($stmt->execute()) echo "success"; else echo $stmt->error;