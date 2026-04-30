<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["id"])) {
    $sql = "DELETE FROM labdarugo WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param("i", $data["id"]);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "ok", "message" => "Játékos sikeresen eltávolítva a keretből!"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Nincs megadva azonosító!"]);
}

$conn->close();
?>