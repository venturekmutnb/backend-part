<?php
require 'database.php';
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (empty($email) || empty($password)) {
        exit("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("❌ email ไม่ถูกต้อง");
    }

    $stmt = $conn->prepare("SELECT acc_id,pass FROM account WHERE email = ? ");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows == 1) {
        $stmt->bind_result($acc_id, $dbpassword);
        $stmt->fetch();

       
        if ($password == $dbpassword) {
            $_SESSION['user_id'] = $acc_id;
            echo "สำเร็จแล้ว";
        } else {
            exit("password wrong!");
        }
    } else {
        exit("ไม่พบผู้ใช้งานนี้");
    }
}
?>