<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "uuser1";       
$pass = "uuser123";     
$dbname = "uuser1";     

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Kapcsolódási hiba: " . $conn->connect_error]));
}

$conn->set_charset("utf8");
?>