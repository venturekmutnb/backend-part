<?php
require "../../database.php";
$id = intval($_GET['id'] ?? 0);
if ($id <= 0) { echo "invalid"; exit; }
$stmt = $conn->prepare("DELETE FROM package WHERE package_id = ?");

$stmt->bind_param("i", $id);
if ($stmt->execute()) echo "success"; else echo $stmt->error;
