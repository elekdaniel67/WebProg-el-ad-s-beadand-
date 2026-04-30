<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "UPDATE labdarugo SET 
            mezszam = ?, 
            utonev = ?, 
            vezeteknev = ?, 
            szulido = ?, 
            ertek = ? 
        WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("isssii", 
    $data["mezszam"], 
    $data["utonev"], 
    $data["vezeteknev"], 
    $data["szulido"], 
    $data["ertek"], 
    $data["id"]
);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "message" => "Játékos adatai frissítve!"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$stmt->close();
$conn->close();
?>