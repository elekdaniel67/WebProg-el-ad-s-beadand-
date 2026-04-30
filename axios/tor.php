<?php
include "db.php";
$data = json_decode(file_get_contents("php://input"), true);
$stmt = $conn->prepare("DELETE FROM labdarugo WHERE id=?");[cite: 1]
$stmt->bind_param("i", $data['id']);
$stmt->execute();
echo json_encode(["status" => "ok"]);
?>