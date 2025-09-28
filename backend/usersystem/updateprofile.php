<?php
ini_set('display_errors', 0); // ปิด warning เพื่อไม่ให้บัง JSON
error_reporting(E_ALL);
header('Content-Type: application/json');

session_start();
require '../database.php';

// ตรวจ session
if(!isset($_SESSION['acc_id'])){
    echo json_encode(['success'=>false,'message'=>'User not logged in']);
    exit;
}

$acc_id = intval($_SESSION['acc_id']);
$data = json_decode(file_get_contents('php://input'), true);

// ตรวจข้อมูลรับเข้าจาก client
$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// ตรวจว่า username, email ไม่ว่าง
if(!$username || !$email){
    echo json_encode(['success'=>false,'message'=>'Username and Email are required']);
    exit;
}

try {
    // ถ้ามี password ให้ update ด้วย ถ้าไม่มีก็ update username + email
    if($password){
        $stmt = $conn->prepare("UPDATE account SET username=?, email=?, pass=? WHERE acc_id=?");
        $stmt->bind_param("sssi", $username, $email, $password, $acc_id);
    } else {
        $stmt = $conn->prepare("UPDATE account SET username=?, email=? WHERE acc_id=?");
        $stmt->bind_param("ssi", $username, $email, $acc_id);
    }

    if($stmt->execute()){
    // อัปเดต session ด้วย
    $_SESSION['username'] = $username;
    $_SESSION['email'] = $email;
    if($password){
        $_SESSION['pass'] = $password; // ถ้าอยากเก็บ password (ไม่แนะนำให้เก็บ plain text)
    }

    echo json_encode([
        'success' => true,
        'message' => 'Profile updated successfully',
        'role' => $_SESSION['role'] ?? 'user',
        'username' => $_SESSION['username']
    ]);
    } else {
        echo json_encode(['success'=>false,'message'=>'Failed to update profile: '.$conn->error]);
    }
} catch(Exception $e){
    echo json_encode(['success'=>false,'message'=>'Error: '.$e->getMessage()]);
}
