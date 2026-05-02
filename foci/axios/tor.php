<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include "db.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (isset($data['id'])) {
    $stmt = $conn->prepare("DELETE FROM labdarugo WHERE id=?");
    $stmt->bind_param("i", $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "ok", "message" => "Játékos törölve"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Hiányzó azonosító"]);
}

$conn->close();
?>