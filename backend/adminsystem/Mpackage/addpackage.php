<?php
require "../../database.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { echo "method"; exit; }

$title = $_POST['title'] ?? '';
$destination = $_POST['destination'] ?? '';
$duration_days = intval($_POST['duration_days'] ?? 0);
$travel_date = $_POST['travel_date'] ?? null;
$price = floatval($_POST['price'] ?? 0);
$available_seats = intval($_POST['available_seats'] ?? 0);
$description = $_POST['description'] ?? '';
$plansJson = $_POST['plans'] ?? '[]';

// handle image
$imagePath = null;
if (!empty($_FILES['image']['name'])) {
  $uploads = __DIR__ . 'packagepics/';
  if (!file_exists($uploads)) mkdir($uploads, 0755, true);
  $name = time() . '_' . basename($_FILES['image']['name']);
  $target = $uploads . $name;
  if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
    $imagePath = 'packagepics/' . $name;
  }
}

// Note: bind types adjusted below; safer to use proper binding
// Pre-prepare in simpler way:
$stmt = $conn->prepare("INSERT INTO package (title, description, image_url, destination, duration_days, travel_date, price, available_seats) VALUES (?,?,?,?,?,?,?,?)");
$stmt->bind_param("sssssidi", $title, $description, $imagePath, $destination, $duration_days, $travel_date, $price, $available_seats);

if (!$stmt->execute()) { echo $stmt->error; exit; }
$package_id = $stmt->insert_id;

// insert plans
$plans = json_decode($plansJson, true);
if (is_array($plans)) {
  $ps = $conn->prepare("INSERT INTO package_plan (package_id, day_number, title, activities, meal_info, hotel_info) VALUES (?,?,?,?,?,?)");
  foreach ($plans as $pl) {
    $day = intval($pl['day_number'] ?? 0);
    $t = $pl['title'] ?? '';
    $act = $pl['activities'] ?? '';
    $meal = $pl['meal_info'] ?? '';
    $hotel = $pl['hotel_info'] ?? '';
    $ps->bind_param("iissss", $package_id, $day, $t, $act, $meal, $hotel);
    $ps->execute();
  }
}

// attach promotions if any
if (!empty($_POST['promotions'])) {
  $promo_ids = $_POST['promotions'];
  if (!is_array($promo_ids)) $promo_ids = [$promo_ids];
  $ppstmt = $conn->prepare("INSERT INTO package_promotion (package_id, promo_id) VALUES (?,?)");
  foreach ($promo_ids as $pid) {
    $ppstmt->bind_param("ii", $package_id, $pid);
    $ppstmt->execute();
  }
}

echo "success";
