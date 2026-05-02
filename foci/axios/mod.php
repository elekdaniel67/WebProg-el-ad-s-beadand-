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
    $sql = "UPDATE labdarugo SET mezszam=?, utonev=?, vezeteknev=?, szulido=?, ertek=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param("isssii", 
        $data['mezszam'], 
        $data['utonev'], 
        $data['vezeteknev'], 
        $data['szulido'], 
        $data['ertek'], 
        $data['id']
    );
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "ok", "message" => "Sikeres frissítés"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Hiányzó ID!"]);
}

$conn->close();
?>