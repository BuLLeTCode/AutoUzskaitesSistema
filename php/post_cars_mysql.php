<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$conn = new mysqli("localhost", "root", "", "auto_info");
$data = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO auto (Razotajs, Marka, Gads)VALUES('$data->manufacture', '$data->model','$data->year')";

$result = $conn->query($sql);

$conn->close();
?>