<?php
include "db.php";
$data = json_decode(file_get_contents("php://input"), true);
$sql = "UPDATE labdarugo SET mezszam=?, utonev=?, vezeteknev=?, szulido=?, ertek=? WHERE id=?";[cite: 1]
$stmt = $conn->prepare($sql);
$stmt->bind_param("isssii", $data['mezszam'], $data['utonev'], $data['vezeteknev'], $data['szulido'], $data['ertek'], $data['id']);
$stmt->execute();
echo json_encode(["status" => "ok"]);
?>