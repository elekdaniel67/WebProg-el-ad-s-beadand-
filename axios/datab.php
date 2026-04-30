<?php
include "db.php";
$result = $conn->query("SELECT * FROM labdarugo ORDER BY id DESC");[cite: 1]
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>