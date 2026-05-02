<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";
$input = file_get_contents("php://input");
$data = json_decode($input, true);


if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nincs adat!"]);
    exit;
}


$sql = "INSERT INTO labdarugo (mezszam, utonev, vezeteknev, szulido, ertek) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);


$stmt->bind_param("isssi", 
    $data['mezszam'], 
    $data['utonev'], 
    $data['vezeteknev'], 
    $data['szulido'], 
    $data['ertek']
);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "id" => $conn->insert_id]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>