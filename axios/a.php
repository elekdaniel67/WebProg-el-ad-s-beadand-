<?php
// A kapcsolat beemelése (ügyelj rá, hogy a db.php-ban jók legyenek az adatok)
include "db.php";

// A React (Axios) felől érkező JSON adatok beolvasása
$data = json_decode(file_get_contents("php://input"), true);

// SQL lekérdezés előkészítése a labdarugo táblához
// Oszlopok: mezszam, klubid, posztid, utonev, vezeteknev, szulido, magyar, kulfoldi, ertek
$sql = "INSERT INTO labdarugo (mezszam, klubid, posztid, utonev, vezeteknev, szulido, magyar, kulfoldi, ertek)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

// Adatok bekötése (i = integer, s = string)
$stmt->bind_param("iiisssiii", 
    $data["mezszam"], 
    $data["klubid"], 
    $data["posztid"], 
    $data["utonev"], 
    $data["vezeteknev"], 
    $data["szulido"], 
    $data["magyar"], 
    $data["kulfoldi"], 
    $data["ertek"]
);

// Végrehajtás
if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "message" => "Játékos sikeresen rögzítve!"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$stmt->close();
$conn->close();
?>