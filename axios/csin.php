<?php
include "db.php";
$data = json_decode(file_get_contents("php://input"), true);
$sql = "INSERT INTO labdarugo (mezszam, utonev, vezeteknev, szulido, ertek) VALUES (?, ?, ?, ?, ?)";[cite: 1]
$stmt = $conn->prepare($sql);
$stmt->bind_param("isssi", $data['mezszam'], $data['utonev'], $data['vezeteknev'], $data['szulido'], $data['ertek']);
$stmt->execute();
echo json_encode(["status" => "ok"]);
?>