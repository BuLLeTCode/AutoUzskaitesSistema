<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "auto_info");
$car_data = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO auto_details (Auto_Marka, Auto_Razotajs, Auto_Gads, Apkopes_veids, Date, Izmaksas, Komentari)
VALUES('$car_data->selectedModel', '$car_data->selectedManufacture','$car_data->selectedYear', '$car_data->option', '$car_data->date',
        '$car_data->cost', '$car_data->comment')";
$result = $conn->query($sql);

$conn->close();
?>