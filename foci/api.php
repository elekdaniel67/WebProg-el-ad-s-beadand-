<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch($method) {
    case 'GET':
        $sql = "SELECT id, mezszam, vezeteknev, utonev, szulido, ertek FROM labdarugo ORDER BY id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $sql = "INSERT INTO labdarugo (mezszam, vezeteknev, utonev, szulido, ertek) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $input['mezszam'], 
            $input['vezeteknev'], 
            $input['utonev'], 
            $input['szulido'], 
            $input['ertek']
        ]);
        echo json_encode(["status" => "success", "message" => "Játékos igazolva!"]);
        break;

    case 'PUT':
        $id = $_GET['id'];
        $sql = "UPDATE labdarugo SET mezszam=?, vezeteknev=?, utonev=?, szulido=?, ertek=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $input['mezszam'], 
            $input['vezeteknev'], 
            $input['utonev'], 
            $input['szulido'], 
            $input['ertek'], 
            $id
        ]);
        echo json_encode(["status" => "success"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM labdarugo WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        echo json_encode(["status" => "success"]);
        break;
}
?>