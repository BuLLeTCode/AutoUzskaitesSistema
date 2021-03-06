<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "auto_info");

$car_data = json_decode(file_get_contents("php://input"));

$result = $conn->query("SELECT * FROM auto_info WHERE Auto_Razotajs='$car_data->selectedManufacture',
Auto_Marka='$car_data->selectedModel', Auto_Gads='$car_data->selectedYear'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Service":"'  . $rs["Apkopes_veids"] . '",';
    $outp .= '"Date_service":"'   . $rs["Date"]        . '",';
    $outp .= '"Cost_service":"'. $rs["Izmaksas"]     . '",';
    $outp .= '"Comments_service":"'. $rs["Komentari"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>