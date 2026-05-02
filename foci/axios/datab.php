<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";
$sql = "SELECT * FROM labdarugo ORDER BY id DESC";
$result = $conn->query($sql);

$jatekosok = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $jatekosok[] = $row;
    }
}


echo json_encode($jatekosok);

$conn->close();
?>